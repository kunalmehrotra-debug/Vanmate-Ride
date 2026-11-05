-- PostgreSQL Data Migration for VanMate

INSERT INTO admin_details (Id, Pass, Name, email, phone) VALUES 
('admin', '12345', 'Kunal', 'kunal.mehrotra52@gmail.com', '8933899949');

INSERT INTO assign_vehicle (assignid, vehicleno, driverid) VALUES 
(1, 'UP32MJ5042', 1),
(2, 'UP32RT8945', 2);
-- Reset sequence
SELECT setval('assign_vehicle_assignid_seq', (SELECT MAX(assignid) FROM assign_vehicle));

INSERT INTO booking_request (requestid, userid, vehicletype, source, destination, timing, no_students, status) VALUES 
(1, '9451', 'E-Rickshaw', 'charbagh', 'alambagh', '12:00', 2, 'confirm'),
(2, '8933', 'Car', 'Aliganj', 'mahanagar', '13:00', 1, 'confirm'),
(3, 'kun123', 'Car', 'Hazratganj', 'Aminabad', '15:00', 2, 'confirm'),
(4, '8933', 'Car', 'Aliganj', 'Rajajipuram', '01:20', 2, 'confirm'),
(5, '8299', 'E-Rickshaw', 'BBD', 'Polytechnic', '02:25', 2, 'confirm'),
(6, '9451', 'E-Rickshaw', 'Aliganj', 'BBDU', '15:30', 1, 'confirm'),
(7, '8299', 'Car', 'Aliganj', 'Jankipuram', '15:02', 4, NULL);
SELECT setval('booking_request_requestid_seq', (SELECT MAX(requestid) FROM booking_request));

INSERT INTO driver_details (id, dname, phone, experience, licenseno, validity, address, photo, date, vehicle_number) VALUES 
(1, 'Ashwani', '8889986790', '2', '876555', '2025-04-20', 'lucknow', '8889986790', '2023-04-17', 'UP32MJ5042'),
(2, 'Joe', '9769786799', '0', '909078', '2024-09-05', 'kanpur', '9769786799', '2023-04-17', 'UP32RT8945'),
(3, 'Jerry', '9561345999', '5', '76895', '2024-11-02', 'sitapur', '9561345999', '2023-04-17', NULL);
SELECT setval('driver_details_id_seq', (SELECT MAX(id) FROM driver_details));

INSERT INTO feedback (id, name, email, phone, feedback_text, rating, date) VALUES 
(1, 'kunal', 'kunalmehrotra52@gmail.com', '8299428021', '2', 'good', '2023-03-01'),
(2, 'kunal', 'kunalmehrotra52@gmail.com', '8299428021', '5', 'good', '2023-03-02'),
(3, 'kunal', 'kunalmehrotra52@gmail.com', '8299428021', '5', 'goood', '2023-03-02');
SELECT setval('feedback_id_seq', (SELECT MAX(id) FROM feedback));

INSERT INTO message (messageid, senderid, receiverid, subject, message_text, date, sstatus, rstatus) VALUES 
(1, 'kun123', 'admin', 'Complaint', 'Vehicle arrived late', '2023-05-08', 'true', 'true');
SELECT setval('message_messageid_seq', (SELECT MAX(messageid) FROM message));

INSERT INTO notice (noticeid, topic, contents, date) VALUES 
(1, 'discount', '10percent off for month', '2023-03-28'),
(2, 'discount', '20% off\r\n', '2023-05-13'),
(3, 'discount', '50% off', '2023-05-13'),
(4, 'discount', '34% off', '2023-05-13'),
(5, 'discount', '13% off', '2023-05-13'),
(6, 'discount', '90% off', '2023-05-13');
SELECT setval('notice_noticeid_seq', (SELECT MAX(noticeid) FROM notice));

INSERT INTO parent (id, password, name, email, phone, city, address, date) VALUES 
('8299', 'kunal', 'Dhananjay', 'kunalmehrotra52@gmail.com', '8299428021', 'Kanpur', ' C-1119, Indiranagar\r\nLucknow', '2023-03-17'),
('8933', 'kunal', 'Kunal Mehrotra', 'kunalmehrotra50@gmail.com', '8933899949', 'Lucknow', ' C-1449, rajajipuram\r\nLucknow', '2023-03-16'),
('kun123', 'hello', 'Jhon', 'knjhh56@gmail.com', '9788665466', 'Lucknow', 'Kanpur\r\n', '2023-05-08');

INSERT INTO school (id, password, sname, email, phone, board, city, owner, address, stype, date, latitude, longitude) VALUES 
('5547', 'hello', 'St Mary', 'kunalmehrotra52@gmail.com', '8299428021', 'ICSE', 'Lucknow', 'Dhananjay', 'C-1449, rajajipuram\r\nLucknow', 'Senior Secondary', '2023-03-15', 26.839170, 80.886950),
('9451', 'hello', 'CMS', 'kunalmehrotra50@gmail.com', '8933899949', 'CBSE', 'Lucknow', 'JHONY', 'RDSO\r\nLucknow', 'Senior Secondary', '2023-03-18', 26.846690, 80.946170);

INSERT INTO student_details (stid, student_name, standard, age, school_name, userid, status, requestid, vehicle_number) VALUES 
(1, 'Ritik', '12', 18, 'CMS', '9451', 'confirm', '1', 'UP32RT8945'),
(2, 'dhananjay', '5', 10, 'CMS', '9451', 'confirm', '1', 'UP32RT8945'),
(3, 'Rock', '3', 8, 'St Mary', '8933', 'confirm', '2', 'UP32MJ5042'),
(4, 'Sccott', '5', 10, 'Christchurch', 'Kun123', 'confirm', '3', 'UP32MJ5042'),
(5, 'Jerry', '8', 13, 'Christchurch', 'Kun123', 'confirm', '3', 'UP32MJ5042'),
(6, 'Sccott', '5', 10, 'Christchurch', 'Kun123', 'confirm', '3', 'UP32MJ5042'),
(7, 'Jerry', '8', 13, 'Christchurch', 'Kun123', 'confirm', '3', 'UP32MJ5042'),
(8, 'Ashwin', '7', 13, 'CMS', '8933', NULL, '4', NULL),
(9, 'Rohit', '12', 18, 'CMS', '8933', NULL, '4', NULL),
(10, 'Raghav', '3', 7, 'bbdu', '8299', NULL, '5', NULL),
(11, 'dhananjay', '12', 18, 'bbdu', '8299', NULL, '5', NULL);
SELECT setval('student_details_stid_seq', (SELECT MAX(stid) FROM student_details));

INSERT INTO transaction (id, userid, name, email, phone, charge, transactionid, requestid) VALUES 
(1, '8933', 'Kunal Mehrotra', 'kunalmehrotra50@gmail.com', '8933899949', 6000, '086ba86c-6d6d-436f-8ea1-e1fbc6bdd316', 2),
(2, '9451', 'CMS', 'kunalmehrotra50@gmail.com', '8933899949', 2000, '7d1220e7-45ef-4b4d-b489-8b8fb533f34d', 1),
(3, 'Kun123', 'Jhon', 'knjhh56@gmail.com', '9788665466', 6000, 'cc91abdb-b1b5-4ecd-83b3-0437a7c6b854', 3),
(4, '9451', 'CMS', 'kunalmehrotra50@gmail.com', '8933899949', 2000, '0799efa9-62e6-49bb-a05b-82ad9cf4d82e', 6);
SELECT setval('transaction_id_seq', (SELECT MAX(id) FROM transaction));

INSERT INTO user_query (serial_number, user_name, user_email, user_phone, user_doubt, date) VALUES 
(1, 'scott', 'scott@gmail.com', NULL, 'how to open portal', '2023-02-27'),
(2, 'kunal', 'kunalmehrotra52@gmail.com', '8299428021', 'how to login', '2023-02-28'),
(3, 'kunal', 'kunalmehrotra52@gmail.com', '8299428021', 'How to book ride', '2023-02-28'),
(4, 'kunal', 'kunalmehrotra52@gmail.com', '8299428021', 'I want to book a van', '2023-03-01');
SELECT setval('user_query_serial_number_seq', (SELECT MAX(serial_number) FROM user_query));

INSERT INTO vehicle_charges (id, vehicle_type, charge, description) VALUES 
(1, 'E-Rickshaw', 2000, 'per month'),
(2, 'Van', 4000, 'per month'),
(3, 'Car', 6000, 'per month');
SELECT setval('vehicle_charges_id_seq', (SELECT MAX(id) FROM vehicle_charges));

INSERT INTO vehicle_details (vehicle_type, vehicle_number, vehicle_description, date, status, device_id) VALUES 
('Van', 'UP32KJ8933', 'its a van', '2023-04-17', NULL, '5187'),
('Car', 'UP32MJ5042', 'its a car', '2023-04-17', 'busy', '5187'),
('E-Rickshaw', 'UP32RT8945', 'its an rickshaw', '2023-04-17', 'busy', '5187');
