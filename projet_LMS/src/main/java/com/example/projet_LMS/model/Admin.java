
package com.example.projet_LMS.model;

import java.util.List;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Admin extends Utilisateur {

    // Champ spécifique à l'admin
    @Column(name = "privileges", length = 200)
    private String privileges;

    // Relation OneToMany avec Paiment
    @OneToMany(mappedBy = "admin") // Doit correspondre au nom de l'attribut côté "Paiment"
    private List<Paiment> paiments;
}

