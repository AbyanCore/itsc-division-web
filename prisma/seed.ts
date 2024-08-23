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
        uuid: "adm1",
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
        uuid: "pen1",
        fullname: "Pengajar Satu",
        surname: "Satu",
        address: "Alamat Pengajar Satu",
        email: "pengajar1@sekolah.com",
        password: Secure.hashPassword("password123"),
        phone_number: "081234567890",
        type: "pengajar",
      },
      {
        uuid: "pen2",
        fullname: "Pengajar Dua",
        surname: "Dua",
        address: "Alamat Pengajar Dua",
        email: "pengajar2@sekolah.com",
        password: Secure.hashPassword("password123"),
        phone_number: "081234567891",
        type: "pengajar",
      },
      {
        uuid: "pen3",
        fullname: "Pengajar Tiga",
        surname: "Tiga",
        address: "Alamat Pengajar Tiga",
        email: "pengajar3@sekolah.com",
        password: Secure.hashPassword("password123"),
        phone_number: "081234567892",
        type: "pengajar",
      },
      {
        uuid: "pen4",
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
        uuid: "sis1",
        fullname: "Siswa Satu",
        surname: "Satu",
        address: "Alamat Siswa Satu",
        email: "siswa1@sekolah.com",
        password: Secure.hashPassword("password123"),
        phone_number: "081234567894",
        type: "siswa",
      },
      {
        uuid: "sis2",
        fullname: "Siswa Dua",
        surname: "Dua",
        address: "Alamat Siswa Dua",
        email: "siswa2@sekolah.com",
        password: Secure.hashPassword("password123"),
        phone_number: "081234567895",
        type: "siswa",
      },
      {
        uuid: "sis3",
        fullname: "Siswa Tiga",
        surname: "Tiga",
        address: "Alamat Siswa Tiga",
        email: "siswa3@sekolah.com",
        password: Secure.hashPassword("password123"),
        phone_number: "081234567896",
        type: "siswa",
      },
      {
        uuid: "sis4",
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
        id: 1,
        name: "Aplikasi",
        description: "Pelajaran Matematika",
      },
      {
        id: 2,
        name: "SioT",
        description: "Pelajaran Fisika",
      },
      {
        id: 3,
        name: "Web",
        description: "Pelajaran Kimia",
      },
    ],
  });

  // adding user to division
  console.log("Adding user to division...");

  await prisma.division_enrollment.createMany({
    skipDuplicates: true,
    data: [
      {
        division_id: 1,
        user_uuid: "pen1",
      },
      {
        division_id: 2,
        user_uuid: "pen2",
      },
      {
        division_id: 3,
        user_uuid: "pen3",
      },
      {
        division_id: 3,
        user_uuid: "pen4",
      },
      {
        division_id: 1,
        user_uuid: "sis1",
      },
      {
        division_id: 2,
        user_uuid: "sis2",
      },
      {
        division_id: 3,
        user_uuid: "sis3",
      },
      {
        division_id: 3,
        user_uuid: "sis4",
      },
    ],
  });

  // create attendance
  console.log("Creating attendance...");

  await prisma.attendance.createMany({
    skipDuplicates: true,
    data: [
      {
        id: 1,
        name: "Kehadiran Pertama",
        description: "Kehadiran Pertama",
        start_at: new Date(),
        end_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
      },
      {
        id: 2,
        name: "Kehadiran Kedua",
        description: "Kehadiran Kedua",
        start_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
        end_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 6),
      },
      {
        id: 3,
        name: "Kehadiran Ketiga",
        description: "Kehadiran Ketiga",
        start_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
        end_at: new Date(Date.now()),
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
