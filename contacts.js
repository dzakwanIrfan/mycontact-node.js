const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');
// const { stdout } = require("process");
// const readline = require("readline");

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// })

//buat folder data kalau belum ada
const dirPath = './data';
if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath);
}

//buat file contacts.json kalau belum ada
const dataPath = './data/contacts.json';
if(!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}

// const pertanyaan = (pertanyaan) => {
//     return new Promise((resolve, reject) => {
//         rl.question(pertanyaan, (item) => {
//             resolve(item);
//         });
//     });
// };

const loadContact = () => {
    const file = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(file);
    return contacts;
}

const simpanContact = (nama, email, noHP) => {
    const contact = { nama, email, noHP };
    const contacts = loadContact();

    //cek duplikat
    const duplikat = contacts.find((contact) => contact.nama === nama);
    if(duplikat){
        console.log(chalk.red.inverse.bold('Contact sudah terdaftar, gunakan nama lain!'));
        return false;
    }

    //cek email
    if(email){
        if(!validator.isEmail(email)){
            console.log(chalk.red.inverse.bold('Email tidak valid!'));
            return false;
        }
    }

    //cek email
    if(!validator.isMobilePhone(noHP, 'id-ID')){
        console.log(chalk.red.inverse.bold('Nomor HP tidak valid!'));
        return false;
    }


    contacts.push(contact);

    fs.writeFileSync("data/contacts.json", JSON.stringify(contacts, null, 2));

    console.log(chalk.green.inverse.bold(`Terimakasih ${nama}, sudah memasukan data`));
};

listContact = () => {
    const contacts = loadContact();
    console.log(chalk.cyan.inverse.bold(`Daftar kontak`));
    contacts.forEach((contact, i) => {
        let email = '';
        if(contact.email != undefined){
            email = ` - ${contact.email}`
        }
        console.log(`${i + 1}. ${contact.nama} - ${contact.noHP}${email}`);
    });
};

detailContact = (nama) => {
    const contacts = loadContact();

    const contact = contacts.find(
        (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
    );

    if(!contact){
        console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan!`));
        return false;
    }

    console.log(chalk.blue.inverse.bold(`${nama}`));
    console.log(contact.noHP);

    if(contact.email){
        console.log(contact.email);
    }
}

const deleteContact = (nama) => {
    const contacts = loadContact();
    const newContacts = contacts.filter(
        (contact) => contact.nama.toLowerCase() != nama.toLowerCase()
    );

    if(contacts.length === newContacts.length){
        console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan!`));
        return false;
    }

    fs.writeFileSync("data/contacts.json", JSON.stringify(newContacts, null, 2));

    console.log(chalk.green.inverse.bold(`Data kontak ${nama} berhasil dihapus!`));

}

module.exports = { simpanContact, listContact, detailContact, deleteContact };