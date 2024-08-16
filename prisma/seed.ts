import { PrismaClient } from "@prisma/client";
import { hash } from "crypto";
const prisma = new PrismaClient();

class Secure {
  static hashPassword(password: string) {
    return hash("sha256", password).toString();
  }
}

async function main() {
  // create user
  console.log("Creating user...");

  await prisma.user.createMany({
    skipDuplicates: true,
    data: [
      {
        fullname: "admin admin",
        surname: "admin",
        address: "-",
        email: "admin@admin.com",
        password: Secure.hashPassword("admin"),
        phone_number: "-",
        type: "admin",
      },
      // Data pengajar
      {
        fullname: "Pengajar Satu",
        surname: "Satu",
        address: "Alamat Pengajar Satu",
        email: "pengajar1@sekolah.com",
        password: Secure.hashPassword("password123"),
        phone_number: "081234567890",
        type: "pengajar",
      },
      {
        fullname: "Pengajar Dua",
        surname: "Dua",
        address: "Alamat Pengajar Dua",
        email: "pengajar2@sekolah.com",
        password: Secure.hashPassword("password123"),
        phone_number: "081234567891",
        type: "pengajar",
      },
      {
        fullname: "Pengajar Tiga",
        surname: "Tiga",
        address: "Alamat Pengajar Tiga",
        email: "pengajar3@sekolah.com",
        password: Secure.hashPassword("password123"),
        phone_number: "081234567892",
        type: "pengajar",
      },
      {
        fullname: "Pengajar Empat",
        surname: "Empat",
        address: "Alamat Pengajar Empat",
        email: "pengajar4@sekolah.com",
        password: Secure.hashPassword("password123"),
        phone_number: "081234567893",
        type: "pengajar",
      },

      // Data siswa
      {
        fullname: "Siswa Satu",
        surname: "Satu",
        address: "Alamat Siswa Satu",
        email: "siswa1@sekolah.com",
        password: Secure.hashPassword("password123"),
        phone_number: "081234567894",
        type: "siswa",
      },
      {
        fullname: "Siswa Dua",
        surname: "Dua",
        address: "Alamat Siswa Dua",
        email: "siswa2@sekolah.com",
        password: Secure.hashPassword("password123"),
        phone_number: "081234567895",
        type: "siswa",
      },
      {
        fullname: "Siswa Tiga",
        surname: "Tiga",
        address: "Alamat Siswa Tiga",
        email: "siswa3@sekolah.com",
        password: Secure.hashPassword("password123"),
        phone_number: "081234567896",
        type: "siswa",
      },
      {
        fullname: "Siswa Empat",
        surname: "Empat",
        address: "Alamat Siswa Empat",
        email: "siswa4@sekolah.com",
        password: Secure.hashPassword("password123"),
        phone_number: "081234567897",
        type: "siswa",
      },

      // Data dummy
      {
        fullname: "Dummy Satu",
        surname: "Satu",
        address: "Alamat Dummy Satu",
        email: "dummy1@example.com",
        password: Secure.hashPassword("password123"),
        phone_number: "081234567898",
        type: "guest",
      },
      {
        fullname: "Dummy Dua",
        surname: "Dua",
        address: "Alamat Dummy Dua",
        email: "dummy2@example.com",
        password: Secure.hashPassword("password123"),
        phone_number: "081234567899",
        type: "guest",
      },
      {
        fullname: "Dummy Tiga",
        surname: "Tiga",
        address: "Alamat Dummy Tiga",
        email: "dummy3@example.com",
        password: Secure.hashPassword("password123"),
        phone_number: "081234567900",
        type: "guest",
      },
      {
        fullname: "Dummy Empat",
        surname: "Empat",
        address: "Alamat Dummy Empat",
        email: "dummy4@example.com",
        password: Secure.hashPassword("password123"),
        phone_number: "081234567901",
        type: "guest",
      },
    ],
  });

  // create division
  console.log("Creating division...");

  await prisma.division.createMany({
    skipDuplicates: true,
    data: [
      {
        name: "Aplikasi",
        description: "Pelajaran Matematika",
      },
      {
        name: "SioT",
        description: "Pelajaran Fisika",
      },
      {
        name: "Web",
        description: "Pelajaran Kimia",
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
