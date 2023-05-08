## RS_School nodejs course. Task File Manager.

### Quick start

Before start make sure that you have 18 LTS version of Node.js on your machine

1. Copy this repository

```
git clone https://github.com/MaSkA6293/node-js-File-Manager.git
```

2. Go to the project folder

```
cd node-js-File-Manager/
```

3. To run use the following script. You have to pass username.

```
npm run start -- --username=your_username
```

## List of operations and their syntax:

- Navigation & working directory (nwd)
  - Go upper from current directory (when you are in the root folder this operation shouldn't change working directory)
  ```bash
  up
  ```
  - Go to dedicated folder from current directory (`path_to_directory` can be relative or absolute)
  ```bash
  cd path_to_directory
  ```
  - Print in console list of all files and folders in current directory. List should contain:
    - list should contain files and folder names (for files - with extension)
    - folders and files are sorted in alphabetical order ascending, but list of folders goes first
    - type of directory content should be marked explicitly (e.g. as a corresponding column value)
  ```bash
  ls
  ```
- Basic operations with files
  - Read file and print it's content in console (should be done using Readable stream):
  ```bash
  cat path_to_file
  ```
  - Create empty file in current working directory:
  ```bash
  add new_file_name
  ```
  - Rename file (content should remain unchanged):
  ```bash
  rn path_to_file new_filename
  ```
  - Copy file (should be done using Readable and Writable streams):
  ```bash
  cp path_to_file path_to_new_directory
  ```
  - Move file (same as copy but initial file is deleted, copying part should be done using Readable and Writable streams):
  ```bash
  mv path_to_file path_to_new_directory
  ```
  - Delete file:
  ```bash
  rm path_to_file
  ```
- Operating system info (prints following information in console)
  - Get EOL (default system End-Of-Line) and print it to console
  ```bash
  os --EOL
  ```
  - Get host machine CPUs info (overall amount of CPUS plus model and clock rate (in GHz) for each of them) and print it to console
  ```bash
  os --cpus
  ```
  - Get home directory and print it to console
  ```bash
  os --homedir
  ```
  - Get current _system user name_ (Do not confuse with the username that is set when the application starts) and print it to console
  ```bash
  os --username
  ```
  - Get CPU architecture for which Node.js binary has compiled and print it to console
  ```bash
  os --architecture
  ```
- Hash calculation
  - Calculate hash for file and print it into console
  ```bash
  hash path_to_file
  ```
- Compress and decompress operations
  - Compress file (using Brotli algorithm, should be done using Streams API)
  ```bash
  compress path_to_file path_to_destination
  ```
  - Decompress file (using Brotli algorithm, should be done using Streams API)
  ```bash
  decompress path_to_file path_to_destination
  ```
  NB! After decompressing of previously compressed file result should not differ with originally compressed file

# Result

1. [Task link](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/file-manager/assignment.md)

2. Done 7.12.2022 / deadline 20.12.2022

3. Score: 320 / 320

## Basic Scope

- General
  - [x] +6\*\* Application accepts username and prints proper message
  - [x] +10\*\* Application exits if user pressed `ctrl+c` or sent `.exit` command and proper message is printed
- Operations fail
  - [x] +20\*\* Attempts to perform an operation on a non-existent file or work on a non-existent path result in the operation fail
  - [x] +10\*\* Operation fail doesn't crash application
- Navigation & working directory operations implemented properly
  - [x] +10\*\* Go upper from current directory
  - [x] +10\*\* Go to dedicated folder from current directory
  - [x] +20\*\* List all files and folders in current directory
- Basic operations with files implemented properly
  - [x] +10\*\* Read file and print it's content in console
  - [x] +10\*\* Create empty file
  - [x] +10\*\* Rename file
  - [x] +10\*\* Copy file
  - [x] +10\*\* Move file
  - [x] +10\*\* Delete file
- Operating system info (prints following information in console) implemented properly
  - [x] +6\*\* Get EOL (default system End-Of-Line)
  - [x] +10\*\* Get host machine CPUs info (overall amount of CPUS plus model and clock rate (in GHz) for each of them)
  - [x] +6\*\* Get home directory
  - [x] +6\** Get current *system user name\* (Do not confuse with the username that is set when the application starts)
  - [x] +6\*\* Get CPU architecture for which Node.js binary has compiled
- Hash calculation implemented properly
  - [x] +20\*\* Calculate hash for file
- Compress and decompress operations
  - [x] +20\*\* Compress file (using Brotli algorithm)
  - [x] +20\*\* Decompress file (using Brotli algorithm)

## Advanced Scope

- [x] +30\*\* All operations marked as to be implemented using certain streams should be performed using Streams API
- [x] +20\*\* No synchronous Node.js API with asynchronous analogues is used (e.g. not used `readFileSync` instead of `readFile`)
- [x] +20\*\* Codebase is written in ESM modules instead of CommonJS
- [x] +20\*\* Codebase is separated (at least 7 modules)
