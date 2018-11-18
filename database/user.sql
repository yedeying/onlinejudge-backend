drop table user;
create table user (
  `id` varchar(40) not null,
  `username` varchar(50) not null,
  `email` varchar(100) not null,
  `password` varchar(100) not null,
  `salt` varchar(100) not null,
  `role` enum('normal', 'admin') not null default 'normal',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  primary key (`id`),
  unique key uni_username (`username`)
);
