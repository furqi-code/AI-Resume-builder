create database resumeAI ;
use resumeAI ;

create table users(
	user_id int primary key auto_increment,
    Username varchar(100),
    Password varchar(100),
    Email varchar(100)
);

create table resumeTitle(
    resume_id int primary key auto_increment,
    title VARCHAR(100),
    created_at timestamp,
    created_by int,
    FOREIGN KEY (created_by) REFERENCES users(user_id) ON DELETE CASCADE
);
 
create table personal_details (
    resume_id int,
    name VARCHAR(100),
    email VARCHAR(100),
    contact VARCHAR(20),
    linkedin VARCHAR(255),
    github VARCHAR(255),
    gender enum('M','F','Male','Female'),
    created_by int,
    FOREIGN KEY (created_by) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (resume_id) REFERENCES resumeTitle(resume_id) ON DELETE CASCADE
);

create table education (
    resume_id int,
    degree_name VARCHAR(100),
    start_year timestamp,
    end_year timestamp,
    percentage VARCHAR(10),
    created_by int,
    FOREIGN KEY (created_by) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (resume_id) REFERENCES resumeTitle(resume_id) ON DELETE CASCADE
);

create table job_history (
    resume_id int,
    company_name VARCHAR(100),
    start_year timestamp,
    end_year timestamp,
    discription TEXT(65534),
    created_by int,
    FOREIGN KEY (created_by) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (resume_id) REFERENCES resumeTitle(resume_id) ON DELETE CASCADE
);

create table skills (
    resume_id int,
    skill_name1 VARCHAR(100),
    ratings1 int,
    skill_name2 VARCHAR(100),
    ratings2 int,
	created_by int,
    FOREIGN KEY (created_by) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (resume_id) REFERENCES resumeTitle(resume_id) ON DELETE CASCADE
);


select * from users ;
delete from users where user_id = 5 ;
drop table users ;

select * from resumeTitle ;
delete from resumeTitle where resume_id = 5 ;
drop table resumeTitle ;

select * from personal_details ;	
delete from personal_details where resume_id = 5 ;
drop table personal_details ;

select * from education ;
delete from education where resume_id = 5 ;
drop table education ;

select * from job_history ;			
delete from job_history where resume_id = 6 ;
drop table job_history ;

select * from skills ;
drop table skills ;

CREATE TABLE test_time (
  sample_time TIMESTAMP
);
INSERT INTO test_time (sample_time) VALUES ('2025-06-28 07:39:00');
SELECT * FROM test_time ;
drop table test_time ;


drop database resumeAI ;