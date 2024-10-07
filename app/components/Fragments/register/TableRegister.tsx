import Image from "next/image";
import { useRouter } from "next/navigation";

const TableRegister = () => {
  const router = useRouter();
  const handleEditAccount = () => {
    router.push("/register/editUser");
  };

  return (
    <div>
      {/* Tabel Register */}

      <div className="overflow-x-auto">
        <table className="w-full text-xs bg-white table-auto text-start">
          {/* Table Head */}
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

          {/* Table Body */}
          <tbody>
            <tr className="text-center">
              <td className="py-2 border-b">1</td> {/* No */}
              <td className="border-b">123456</td> {/* NIK */}
              <td className="border-b">John Doe</td> {/* Nama */}
              <td className="border-b">john@example.com</td> {/* Email */}
              <td className="border-b">2024-09-09</td> {/* Tanggal Input */}
              <td className="border-b text-blue-400 font-medium">Lihat Foto</td>
              {/* Foto */}
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
                    alt="edit"
                    width={26}
                    height={26}
                    className="inline-block mr-2"
                  />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableRegister;
