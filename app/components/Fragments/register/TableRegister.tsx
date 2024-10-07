import api from "@/app/(pages)/(auth)/login/api";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"; // Impor useState

interface User {
  id: number;
  username: string;
  role: string;
  nik: string;
  name: string;
  email: string;
  tanggal_input: string;
  ktpPhoto: string;
}

const TableRegister = () => {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]); // Deklarasikan state users

  const handleEditAccount = () => {
    router.push("/register/editUser");
  };

  // Fetch users
  const fetchUsers = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const res = await api.get("/users/list", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("Full response:", res.data); // Lihat respons lengkap

      const usersData = Array.isArray(res.data.data.users)
        ? res.data.data.users
        : [];
      setUsers(usersData); // Simpan data pengguna ke state
    } catch (error) {
      console.log("error :", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs bg-white table-auto text-start">
          <thead className="bg-[#F5F8FF] text-tulisan">
            <tr>
              <th className="py-2 border-b-[1.8px]">No</th>
              <th className="min-w-[80px] border-b-[1.8px]">NIK</th>
              <th className="min-w-[120px] border-b-[1.8px]">Nama</th>
              <th className="min-w-[150px] border-b-[1.8px]">Email</th>
              <th className="min-w-[120px] border-b-[1.8px]">Tanggal Input</th>
              <th className="min-w-[100px] border-b-[1.8px]">Foto</th>
              <th className="min-w-[80px] border-b-[1.8px]">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user.id} className="text-center">
                <td className="py-2 border-b">{index + 1}</td> {/* No */}
                <td className="border-b">{user.nik || "N/A"}</td> {/* NIK */}
                <td className="border-b">{user.username}</td> {/* Nama */}
                <td className="border-b">{user.email}</td> {/* Email */}
                <td className="border-b">
                  {new Date().toLocaleDateString()}
                </td>{" "}
                {/* Tanggal Input */}
                <td className="border-b text-blue-400 font-medium">
                  {user.ktpPhoto ? (
                    <a
                      href={user.ktpPhoto}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Lihat Foto
                    </a>
                  ) : (
                    "Tidak ada foto"
                  )}
                </td>
                <td className="border-b">
                  <button onClick={handleEditAccount}>
                    <Image
                      src={"/assets/dashboard/register/edit-account.png"}
                      alt="edit"
                      width={26}
                      height={26}
                      className="inline-block mr-2"
                    />
                  </button>
                  <button>
                    <Image
                      src={"/assets/dashboard/register/delete-account.png"}
                      alt="delete"
                      width={26}
                      height={26}
                      className="inline-block mr-2"
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableRegister;
