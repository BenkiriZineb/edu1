  import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
  import { HomeAComponent } from './homeA.component';
  import { UtilisateurService } from '../../inscription/utilisateur.service';
  import { ConfirmationService, MessageService } from 'primeng/api';
  import { HttpClientTestingModule } from '@angular/common/http/testing';
  import { RouterTestingModule } from '@angular/router/testing';
  import { FormsModule } from '@angular/forms';
  import { of, throwError } from 'rxjs';
 import { Utilisateur, UserRole, StatutComptes } from '../../inscription/utilisateur.model';
  import { TableModule } from 'primeng/table';
  import { ConfirmDialogModule } from 'primeng/confirmdialog';
  import { ToastModule } from 'primeng/toast';

  describe('HomeAComponent', () => {  // Changé de 'HomeComponent' à 'HomeAComponent'
    let component: HomeAComponent;
    let fixture: ComponentFixture<HomeAComponent>;
    let utilisateurService: UtilisateurService;
    let messageService: MessageService;

    const mockUtilisateurs: Utilisateur[] = [
     {
      id: 3,
      nom: 'hamid',
      prenom: 'hatim',
      email: 'hatim@example.com',
      role: 'ENSEIGNANT' as UserRole,
      actif: true,
      datedenaissance: '1970-01-15',
      sexe: 'M',
      adresse: 'rabat maroc',
      mdp: 'password'
    },
      {
        id: 2,
        nom: 'Smith',
        prenom: 'Jane',
        email: 'jane@example.com',
        role: 'PROFESSEUR' as UserRole,
        sexe: 'F',
        mdp: 'password',
        datedenaissance: '1985-05-15',
        adresse: '456 Avenue Test',
        actif: true
      },
      {
        id: 1,
        nom: 'ahmed',
        prenom: 'motawakil',
        email: 'john@example.com',
        role: 'PARENT' as UserRole,
        sexe: 'M',
        mdp: 'password',
        datedenaissance: '2000-01-01',
        adresse: 'casa maroc ',
        actif: true
      }
    ];

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [HomeAComponent],
        imports: [
          HttpClientTestingModule,
          RouterTestingModule,
          FormsModule,
          TableModule,
          ConfirmDialogModule,
          ToastModule
        ],
        providers: [
          UtilisateurService,
          ConfirmationService,
          MessageService
        ]
      }).compileComponents();

      fixture = TestBed.createComponent(HomeAComponent);
      component = fixture.componentInstance;
      utilisateurService = TestBed.inject(UtilisateurService);
      messageService = TestBed.inject(MessageService);

      spyOn(utilisateurService, 'getAllUtilisateurs').and.returnValue(of(mockUtilisateurs));
      spyOn(utilisateurService, 'deleteUser').and.returnValue(of({}));
      spyOn(messageService, 'add');

      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should load users on init', () => {
      expect(utilisateurService.getAllUtilisateurs).toHaveBeenCalled();
      expect(component.users.length).toBe(2);
      expect(component.filteredUsers.length).toBe(2);
    });

    it('should apply search filter', () => {
      component.searchTerm = 'john';
      component.applyFilter();
      expect(component.filteredUsers.length).toBe(1);
      expect(component.filteredUsers[0].email).toBe('john@example.com');
    });

    it('should apply role filter', () => {
      component.roleFilter = 'PROFESSEUR';
      component.applyFilter();
      expect(component.filteredUsers.length).toBe(1);
      expect(component.filteredUsers[0].email).toBe('jane@example.com');
    });

    it('should sort table by name', () => {
      component.sortTable('nom');
      expect(component.sortColumn).toBe('nom');
      expect(component.isAsc).toBeTrue();
      expect(component.filteredUsers[0].nom).toBe('Doe');

      component.sortTable('nom');
      expect(component.isAsc).toBeFalse();
      expect(component.filteredUsers[0].nom).toBe('Smith');
    });

    it('should handle delete user', fakeAsync(() => {
      component.confirmDelete(1);
      tick();
      
      expect(utilisateurService.deleteUser).toHaveBeenCalledWith(1);
      expect(messageService.add).toHaveBeenCalled();
    }));

    it('should handle errors when loading users', fakeAsync(() => {
      (utilisateurService.getAllUtilisateurs as jasmine.Spy).and.returnValue(throwError(() => new Error('Error')));
      component.ngOnInit();
      tick();
      
      expect(messageService.add).toHaveBeenCalledWith({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Impossible de charger les utilisateurs'
      });
    }));

    it('should paginate users correctly', () => {
      component.itemsPerPage = 1;
      component.applyFilter();
      
      expect(component.getPaginatedUsers().length).toBe(1);
      expect(component.totalPages).toBe(2);
      
      component.nextPage();
      expect(component.currentPage).toBe(2);
      
      component.prevPage();
      expect(component.currentPage).toBe(1);
    });
  });