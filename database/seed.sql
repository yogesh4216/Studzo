INSERT INTO users (email, hashed_password, full_name, role) VALUES 
('admin@homehub.com', 'hashed_secret', 'Admin User', 'admin'),
('student@university.edu', 'hashed_secret', 'John Student', 'student');

INSERT INTO housing (title, description, address, price, bedrooms, bathrooms, landlord_id) VALUES
('Cozy Apartment near Campus', 'Great place for students', '123 University Ave', 1200.00, 2, 1.0, 1);
