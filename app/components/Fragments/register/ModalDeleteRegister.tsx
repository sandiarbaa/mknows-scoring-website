import api from "@/app/(pages)/(auth)/login/api";

type ModalDeleteRegisterProps = {
  userId: number;
  close: () => void;
  onDelete: (userId: number) => void; // Tambahkan properti ini
};

const ModalDeleteRegister = ({
  userId,
  close,
  onDelete,
}: ModalDeleteRegisterProps) => {
  const fetchDeleteUser = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      console.error("No access token found!");
      return;
    }

    console.log("Deleting user with ID:", userId);
    try {
      const res = await api.delete(`/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("Full response delete:", res.data);
      if (res.status === 200) {
        console.log("User deleted successfully");
        onDelete(userId); // Panggil onDelete dengan ID pengguna
      } else {
        console.error("Failed to delete user:", res.status, res.statusText);
      }
    } catch (error: any) {
      console.error(
        "Error deleting user:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleButtonYes = async () => {
    await fetchDeleteUser();
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white py-10 px-2 max-w-lg rounded-lg shadow-lg border">
          <div>Apakah kamu yakin ingin menghapus account ini?</div>
          <div className="flex justify-around pt-4">
            <button
              onClick={handleButtonYes}
              className="bg-ijoToska py-2 px-4 rounded-lg"
            >
              YES
            </button>
            <button onClick={close} className="bg-red-500 py-2 px-4 rounded-lg">
              NO
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalDeleteRegister;
