import { createContext, useEffect, useState } from "react";
// import axios from "axios"; // Hapus comment ini ketika backend sudah selesai

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  // Gunakan data statis sebagai gantinya (hapus ini ketika menggunakan Axios)
  const staticUserData = {
    // Isi dengan data pengguna sesuai kebutuhan
    name: "Nama Pengguna",
    email: "email@example.com",
    // ...
  };

  useEffect(() => {
    if (!user) {
      // Uncomment kode Axios di bawah ini ketika backend telah selesai
      // axios.get('/profile').then(({ data }) => {
      //   setUser(data);
      //   setReady(true);
      // });

      // Gunakan data statis sebagai gantinya (hapus ini ketika menggunakan Axios)
      setUser(staticUserData);
      setReady(true);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}
