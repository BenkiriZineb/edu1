-- Insertion des matières
INSERT INTO subjects (name, description, level, color, icon, is_active, created_at, updated_at) VALUES
('Mathématiques', 'Mathématiques pour tous les niveaux', 'PRIMAIRE', '#FF6B6B', 'math', true, NOW(), NOW()),
('Français', 'Langue française et littérature', 'PRIMAIRE', '#4ECDC4', 'french', true, NOW(), NOW()),
('Arabe', 'Langue arabe et grammaire', 'PRIMAIRE', '#45B7D1', 'arabic', true, NOW(), NOW()),
('Sciences', 'Sciences naturelles et expérimentales', 'PRIMAIRE', '#96CEB4', 'science', true, NOW(), NOW()),
('Histoire-Géographie', 'Histoire et géographie du Maroc', 'PRIMAIRE', '#FFEAA7', 'history', true, NOW(), NOW()),
('Anglais', 'Langue anglaise', 'PRIMAIRE', '#DDA0DD', 'english', true, NOW(), NOW());

-- Insertion des utilisateurs de test
INSERT INTO users (username, email, password, first_name, last_name, phone, role, is_active, created_at, updated_at) VALUES
('admin', 'admin@edu.ma', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin', 'Système', '0600000000', 'ADMIN', true, NOW(), NOW()),
('teacher1', 'teacher1@edu.ma', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Ahmed', 'Benali', '0600000001', 'ENSEIGNANT', true, NOW(), NOW()),
('student1', 'student1@edu.ma', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Fatima', 'Alaoui', '0600000002', 'ELEVE', true, NOW(), NOW()),
('parent1', 'parent1@edu.ma', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Mohammed', 'Tazi', '0600000003', 'PARENT', true, NOW(), NOW());

-- Insertion des enseignants
INSERT INTO teachers (user_id, speciality, experience_years, bio, created_at, updated_at) VALUES
(2, 'Mathématiques', 5, 'Enseignant expérimenté en mathématiques', NOW(), NOW());

-- Insertion des élèves
INSERT INTO students (user_id, level, parent_id, created_at, updated_at) VALUES
(3, 'CP', 4, NOW(), NOW());

-- Insertion des parents
INSERT INTO parents (user_id, children_count, created_at, updated_at) VALUES
(4, 1, NOW(), NOW());

-- Insertion des cours de test
INSERT INTO courses (title, description, content, level, difficulty, duration, rating, rating_count, is_published, subject_id, teacher_id, created_at, updated_at) VALUES
('Introduction aux mathématiques', 'Cours d''introduction aux mathématiques pour débutants', 'Contenu du cours...', 'PRIMAIRE', 'FACILE', 60, 4.5, 10, true, 1, 1, NOW(), NOW()),
('Grammaire française', 'Cours de grammaire française de base', 'Contenu du cours...', 'PRIMAIRE', 'MOYEN', 45, 4.2, 8, true, 2, 1, NOW(), NOW()),
('Sciences expérimentales', 'Découverte des sciences par l''expérimentation', 'Contenu du cours...', 'PRIMAIRE', 'FACILE', 90, 4.8, 15, true, 4, 1, NOW(), NOW()); 