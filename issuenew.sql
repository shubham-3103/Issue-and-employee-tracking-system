-- phpMyAdmin SQL Dump
-- version 5.3.0-dev+20220801.ff0b2d86c9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 02, 2022 at 11:22 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `issuenew`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `admin_id` varchar(100) NOT NULL,
  `pass` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`admin_id`, `pass`) VALUES
('admin', 'admin'),
('admin@gmail.com', 'sa');

-- --------------------------------------------------------

--
-- Table structure for table `engineer`
--

CREATE TABLE `engineer` (
  `e_id` int(30) NOT NULL,
  `name` varchar(30) NOT NULL,
  `email` varchar(100) NOT NULL,
  `status` tinyint(1) DEFAULT 0,
  `start_date` date NOT NULL DEFAULT current_timestamp(),
  `end_date` date DEFAULT NULL,
  `mob` varchar(10) NOT NULL,
  `password` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `engineer`
--

INSERT INTO `engineer` (`e_id`, `name`, `email`, `status`, `start_date`, `end_date`, `mob`, `password`) VALUES
(5, 'anant', 'anant@gmail.com', 0, '2022-06-21', NULL, '8945237889', 'sa'),
(6, 'rahul', 'rahul@gmail.com', 0, '2022-06-21', NULL, '1256780130', 'sa'),
(7, 'vaibhav', 'v@gmail..com', 0, '2022-06-26', NULL, '19378648', 'sa'),
(8, 'engineer', 'eng@gmail.com', 0, '2022-06-27', NULL, '8791591234', 'sa'),
(9, 'ayush', 'ayushsharma2440@gmail.com', 0, '2022-07-21', NULL, '21124542', 'sa');

-- --------------------------------------------------------

--
-- Table structure for table `query`
--

CREATE TABLE `query` (
  `p_name` varchar(30) NOT NULL,
  `description` varchar(100) NOT NULL,
  `q_id` int(30) NOT NULL,
  `e_id` int(30) DEFAULT NULL,
  `u_id` int(30) DEFAULT NULL,
  `start_date` date NOT NULL DEFAULT current_timestamp(),
  `end_date` date DEFAULT NULL,
  `status` tinyint(1) DEFAULT 0,
  `feedback` varchar(500) DEFAULT NULL,
  `resolution` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `query`
--

INSERT INTO `query` (`p_name`, `description`, `q_id`, `e_id`, `u_id`, `start_date`, `end_date`, `status`, `feedback`, `resolution`) VALUES
('Pc', 'Ram is damage', 80, 5, 107, '2022-07-11', '2022-07-11', 1, 'NULL ', 'safasf'),
('dfgb', 'dfb', 81, 6, 108, '2022-07-11', '2022-07-11', 1, 'NULL ', 'sdfsdfsdf'),
('dfb', 'df', 94, 5, 114, '2022-07-12', '2022-07-13', 1, 'NULL ', 'done'),
('uygh', 'likh', 95, 6, 115, '2022-07-15', '2022-07-12', 1, 'NULL ', 'dsvgsdv'),
('lfknblk', 'ndkl', 96, 5, 116, '2022-07-15', '2022-07-18', 1, 'NULL ', 'sddgbxcb'),
('fdsbgv', 'sdgv', 97, 5, 117, '2022-07-15', '2022-06-28', 1, 'NULL ', 'asfasf'),
('df', 'fb', 98, 7, 118, '2022-07-15', '2022-07-13', 1, 'NULL ', 'as'),
('afaf', 'svsd', 99, 5, 119, '2022-07-16', '2022-07-15', 1, 'NULL ', 'repair'),
('sdg', 'sdfg', 100, 8, 120, '2022-07-16', '2022-07-08', 1, 'NULL ', 'not repaired'),
('sdfggd', 'gsg', 101, 5, 121, '2022-07-16', '2022-07-12', 1, 'NULL ', 'asd'),
('fg', 'dfbh', 102, 5, 122, '2022-07-16', '2022-07-13', 1, 'NULL ', 'asd'),
('headphone', 'bluetooth not working', 103, 5, 123, '2022-07-18', '2022-07-17', 1, 'NULL ', 'bluetooth module change'),
('samsung mobile', 'display not showing', 104, 5, 124, '2022-07-18', '2022-07-18', 1, 'NULL ', 'display changed\r\n'),
('asus laptop', 'Storage less', 105, 5, 125, '2022-07-18', '2022-07-18', 1, 'NULL ', 'change ssd\r\n'),
('kljsdfl', 'sdsdfklj', 106, 5, 126, '2022-07-19', '2022-07-19', 1, 'Excellent', 'compresor changed'),
('lap', 'asus', 107, 6, 127, '2022-07-20', '2022-07-20', 1, 'Worst', 'done'),
('speaker', 'ghur sound', 108, 6, 128, '2022-07-20', '2022-07-20', 1, 'Poor', 'done\r\n'),
('work', 'beruzgar', 109, 5, 129, '2022-07-20', '2022-07-19', 1, 'Average', 'i will give you money 40$'),
('sd', 's', 110, 9, 130, '2022-07-20', '2022-07-21', 1, NULL, 'ss'),
('dsf', 'sdf', 111, 7, 131, '2022-07-21', '2022-07-21', 1, NULL, 'done\r\n'),
('sdfg', 'sdfg', 112, 5, 132, '2022-07-21', '2022-07-21', 1, NULL, 'done\r\n'),
('sdgf', 'dsgv', 113, 6, 133, '2022-07-21', '2022-07-21', 1, NULL, 'sa'),
('kjo', ';lmk', 114, 8, 134, '2022-07-21', '2022-07-21', 1, NULL, 'asd'),
('jm', 'klmn', 115, 9, 135, '2022-07-21', '2022-07-21', 1, NULL, 'ss'),
('kg', 'hjgljhg', 116, 7, 136, '2022-07-21', '2022-07-21', 1, NULL, 'asd'),
('drkfh', 'dfsjkg', 117, 5, 137, '2022-07-21', '2022-07-21', 1, 'Excellent', 'ww'),
('boat', 'headphonew', 118, 9, 138, '2022-07-21', '2022-07-21', 1, 'Good', 'done\r\n'),
('df', 'sd', 119, 5, 139, '2022-07-21', '2022-07-22', 1, NULL, 'donw'),
('Air Conditioner', 'Air not Coming Out', 120, 5, 140, '2022-07-22', '2022-07-26', 1, 'Excellent', 'done'),
('asus laptop', 'ram is damaged', 121, 5, 141, '2022-07-27', '2022-07-27', 1, 'Good', 'ram is changed'),
('Mobile', 'not working', 122, 5, 142, '2022-07-28', '2022-07-28', 1, 'Excellent', 'display changed'),
('comp', 'not booting', 123, 6, 143, '2022-07-28', '2022-07-28', 1, 'Average', 'ram changed'),
('sdfh', 'dslkfh', 124, 9, 144, '2022-07-28', '2022-07-28', 1, 'Poor', 'done'),
('ss', 'dsf', 125, 5, 145, '2022-07-28', '2022-07-28', 1, 'Excellent', 'repaired'),
('dfsg', 'sdf', 126, NULL, 146, '2022-07-29', NULL, 0, NULL, NULL),
('Speakers', 'Bussing sound coming instead of music', 127, NULL, 147, '2022-07-29', NULL, 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `name` varchar(30) DEFAULT NULL,
  `u_id` int(30) NOT NULL,
  `mob` varchar(10) DEFAULT NULL,
  `orgname` varchar(30) DEFAULT NULL,
  `deptname` varchar(30) DEFAULT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`name`, `u_id`, `mob`, `orgname`, `deptname`, `email`) VALUES
('Shubham Sharma', 107, '9568755145', 'Railway', 'Computer enginner', 'shubhu@gmail.com'),
('dfg', 108, '132', 'fdg', 'df', 'shubhu@gmail.com'),
('dfb', 109, '21', 'dfbh', 'gfn', 'shubhu@gmail.com'),
('dfb', 110, '21', 'dfbh', 'gfn', 'shubhu@gmail.com'),
('gthm', 111, '654', 'fgn', 'g', 'shubhu@gmail.com'),
('gvs', 112, '986453', 'kbk', 'kibkj', 'shubhu@gmail.com'),
('654', 113, '4121', 'jhvjk', 'jbkjb', 'shubhu@gmail.com'),
('sdf', 114, '123', 'dgv', 'fdb', 'shubhu@gmail.com'),
('fsfh', 115, '456', 'jhb', 'jgv', 'shubhu@gmail.com'),
('sdfjhb', 116, '456213', 'lkfndv', 'dflknb', 'shubhu@gmail.com'),
('dfgb', 117, '5644565', 'fbgvd', 'dfsgvb', 'shubhu@gmail.com'),
('bn', 118, '54623', 'fdf', 'df', 'shubhu@gmail.com'),
('sdasd', 119, '56423', 'asdfasdf', 'asfasf', 'shubhu@gmail.com'),
('dsaf', 120, '456213', 'sdfsdf', 'sdfg', 'shubhu@gmail.com'),
('gsdgds', 121, '456123', 'sdgds', 'dsgg', 'shubhu@gmail.com'),
('dsfsdf', 122, '564231', 'dsfdsf', 'fdgsd', 'shubhu@gmail.com'),
('shubham', 123, '784512', 'boat', 'student', 'shubhamsharma31031991@gmail.co'),
('shubham sharma', 124, '879465132', 'jk', 'student', 'shubhamsharma31031991@gmail.com'),
('Shubham Sharma', 125, '7846512310', 'student', 'cs', 'shubhamsharma31031991@gmail.com'),
('ayush', 126, '6545', 'qwhoklj', 'sdfkl', 'ayushsharma2440@gmail.com'),
('ayush', 127, '785421', 'home', 'student', 'ayushsharma2440@gmail.com'),
('shubham', 128, '8712', 'home', 'student', 'shubhamsharma31031991@gmail.com'),
('shubham', 129, '4221215', 'home', 'stu', 'shubhamsharma31031991@gmail.com'),
('ds', 130, '54', 'ds', 'sd', 'ayushsharma2440@gmail.com'),
('sdaf', 131, '453', 'sdaf', 'asdf', 'shubhamsharma31031991@gmail.com'),
('asdasd', 132, '35231', 'sdfsdf', 'sdfg', 'shubhamsharma31031991@gmail.com'),
('sdf', 133, '56423', 'sdfg', 'sdfg', 'shubhamsharma31031991@gmail.com'),
('jh', 134, '85654', 'gfh', 'h\';k', 'shubhamsharma31031991@gmail.com'),
('kjhhj', 135, '894658', 'bn', 'lknm', 'shubhamsharma31031991@gmail.com'),
('dsfsdf', 136, '314', 'ghfjf', 'lkgugh', 'shubhamsharma31031991@gmail.com'),
('dfgjkgsdb', 137, '5445', 'dflkg', 'dfkjgh', 'shubhamsharma31031991@gmail.com'),
('Shubham Sharma', 138, '7845123256', 'student', 'home', 'shubhamsharma31031991@gmail.com'),
('asd', 139, '456', 'sdf', 'g', 'shubhamsharma31031991@gmail.com'),
('Shubham Sharma', 140, '7845122356', 'student', 'CSE', 'shubhamsharma31031991@gmail.com'),
('Shubham Sharma', 141, '7854213256', 'student', 'home', 'shubhamsharma31031991@gmail.com'),
('Shubham Sharma', 142, '7854123256', 'Hello', 'CS', 'shubhamsharma31031991@gmail.com'),
('ayush', 143, '12123', 'school', 'cs', 'shubhamsharma31031991@gmail.com'),
('gl', 144, '4', 'jsdhf', 'sdkjhf', 'shubhamsharma31031991@gmail.com'),
('Shubham Sharma', 145, '784501245', 'honme', 'pc', 'shubhamsharma31031991@gmail.com'),
('ayush', 146, '784521', 'dsfds', 'sdf', 'ayushsharma2440@gmail.com'),
('SHubham Sharma', 147, '784523', 'Private', 'Computer Science', 'shubhamsharma31031991@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `userlogin`
--

CREATE TABLE `userlogin` (
  `login_id` varchar(100) NOT NULL,
  `password` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `userlogin`
--

INSERT INTO `userlogin` (`login_id`, `password`) VALUES
('ayushsharma2440@gmail.com', 'sa'),
('shubhamsharma31031991@gmail.com', 'sa'),
('shubhu@gmail.com', 'sa');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `engineer`
--
ALTER TABLE `engineer`
  ADD PRIMARY KEY (`e_id`);

--
-- Indexes for table `query`
--
ALTER TABLE `query`
  ADD PRIMARY KEY (`q_id`),
  ADD KEY `u_id` (`u_id`),
  ADD KEY `e_id` (`e_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`u_id`);

--
-- Indexes for table `userlogin`
--
ALTER TABLE `userlogin`
  ADD PRIMARY KEY (`login_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `engineer`
--
ALTER TABLE `engineer`
  MODIFY `e_id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `query`
--
ALTER TABLE `query`
  MODIFY `q_id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=128;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `u_id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=148;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `query`
--
ALTER TABLE `query`
  ADD CONSTRAINT `query_ibfk_2` FOREIGN KEY (`u_id`) REFERENCES `user` (`u_id`),
  ADD CONSTRAINT `query_ibfk_3` FOREIGN KEY (`e_id`) REFERENCES `engineer` (`e_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
