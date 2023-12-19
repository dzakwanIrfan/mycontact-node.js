const yargs = require("yargs");
const contact = require("./contacts");

//Mengambil argument dari command line

yargs.command({
    command: 'add',
    describe: 'Menambahkan contact baru',
    builder: {
        nama: {
            describe: 'Nama lengkap',
            demandOption: true,
            type: 'string'
        },
        email: {
            describe: 'Email',
            demandOption: false,
            type: 'string'
        },
        noHP: {
            describe: 'Nomor Handphone',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        contact.simpanContact(argv.nama, argv.email, argv.noHP);
    },

}).demandCommand();

//menampilkan semua data
yargs.command({
    command: 'list',
    describe: 'Menambahkan semua data kontak',
    handler(){
        contact.listContact();
    },
});

// menampilkan detail kontak
yargs.command({
    command: 'detail',
    describe: 'Menampilkan detail sebuah contact berdasarkan nama',
    builder: {
        nama: {
            describe: 'Nama lengkap',
            demandOption: true,
            type: 'string'
        },
    },
    handler(argv){
        contact.detailContact(argv.nama);
    },
});

// menghapus kontak berdasarkan nama
yargs.command({
    command: 'delete',
    describe: 'Menghapus sebuah contact berdasarkan nama',
    builder: {
        nama: {
            describe: 'Nama lengkap',
            demandOption: true,
            type: 'string'
        },
    },
    handler(argv){
        contact.deleteContact(argv.nama);
    },
});


yargs.parse();
// yargs.command(
//     'add', 
//     'Menambahkan contact baru', 
//     () => {}, 
//     (argv) => {
//         console.log(argv.nama);
//     });

// const contacts = require('./contacts.js');

// const main = async () => {
//     const nama = await contacts.pertanyaan('Masukan nama Anda: ');
//     const noHP = await contacts.pertanyaan(`Halo ${nama}, masukan No HP Anda: `);

//     contacts.simpanContact(nama, noHP)
// };

// main();

//menuliskan string ke file secara synchronous
// fs.writeFileSync('data/test.txt', 'Hello World! secara synchronous!');

//menuliskan string ke file secara asynchronous
// fs.writeFile('data/test.txt', 'Hello World! secara asynchronous!', (err) =>
//     console.log(err)
// );

//membaca isi file (synchronous)
// const data = fs.readFileSync('data/test.txt', 'utf-8');
// console.log(data);

//membaca isi file (asynchronous)
// fs.readFile('data/test.txt', 'utf-8', (err, data) => {
//     if (err) throw err;
//     console.log(data);
// })

// rl.question('Siapa nama Anda? ', (nama) => {
//     rl.question(`Siapa pacarmu ${nama}? `, (pacar) => {
//         console.log(`${nama} adalah pacar ${pacar}`);
//         rl.close();
//     });
// });

// const pertanyaan2 = () => {
//     return new Promise((resolve, reject) => {
//         rl.question('Masukan no HP Anda: ', (noHP) => {
//             resolve(noHP);
//         });
//     });
// };

// rl.question('Masukan nama Anda: ', (nama) => {
//     rl.question(`Halo ${nama}, masukan no HP Anda : `, (noHP) => {
//         const contact = { nama, noHP };
//         const file = fs.readFileSync('data/contacts.json', 'utf-8');
//         const contacts = JSON.parse(file);

//         contacts.push(contact);

//         fs.writeFileSync("data/contacts.json", JSON.stringify(contacts, null, 2));

//         console.log(`Terimakasih ${nama}, sudah memasukan data`);

//         rl.close();
//     })
// })