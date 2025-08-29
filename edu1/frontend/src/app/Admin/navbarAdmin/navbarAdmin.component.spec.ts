import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavbarAdminComponent } from './navbarAdmin.component';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

describe('NavbarAdminComponent', () => {
  let component: NavbarAdminComponent;
  let fixture: ComponentFixture<NavbarAdminComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [NavbarAdminComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarAdminComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the logo with correct src', () => {
    const logo = fixture.debugElement.query(By.css('.logo'));
    expect(logo).toBeTruthy();
    expect(logo.nativeElement.src).toContain('assets/images/eco.png');
  });

  it('should display admin title', () => {
    const title = fixture.debugElement.query(By.css('.admin-title'));
    expect(title.nativeElement.textContent).toContain('Espace Administrateur');
  });

  it('should have navigation links', () => {
    const links = fixture.debugElement.queryAll(By.css('.nav-links li a'));
    expect(links.length).toBe(5); // 4 liens + logout
    
    expect(links[0].nativeElement.textContent).toContain('Liste Utilisateurs');
    expect(links[1].nativeElement.textContent).toContain('Cours');
    expect(links[2].nativeElement.textContent).toContain('Années Scolaires');
    expect(links[3].nativeElement.textContent).toContain('Paiements');
    expect(links[4].nativeElement.textContent).toContain('Déconnexion');
  });

  it('should call logout method when logout link is clicked', () => {
    spyOn(component, 'logout');
    const logoutLink = fixture.debugElement.query(By.css('.logout-item a'));
    logoutLink.triggerEventHandler('click', null);
    expect(component.logout).toHaveBeenCalled();
  });

  it('should have active class on current route', async () => {
    // Simule la navigation vers '/admin/users'
    await router.navigate(['/admin/users']);
    fixture.detectChanges();
    
    const activeLink = fixture.debugElement.query(By.css('.active'));
    expect(activeLink).toBeTruthy();
    expect(activeLink.nativeElement.textContent).toContain('Liste Utilisateurs');
  });

  it('should contain Font Awesome icons', () => {
    const icons = fixture.debugElement.queryAll(By.css('i'));
    expect(icons.length).toBe(5); // Un icône pour chaque lien
    
    expect(icons[0].nativeElement.classList).toContain('fa-users');
    expect(icons[4].nativeElement.classList).toContain('fa-sign-out-alt');
  });
});