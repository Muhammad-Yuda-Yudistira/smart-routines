
import React, { useState, useEffect, useRef } from 'react';


const JoditHandle = ({ description, setDescription }) => {
  const [joditLoaded, setJoditLoaded] = useState(false);
  const [JoditEditor, setJoditEditor] = useState(null);

  const editor = useRef(null)

  const config = {
    placeholder: "Write here all..",
    sanitize: true,
  };

  useEffect(() => {
    const loadComponent = async () => {
      // Menggunakan import() untuk memuat JoditEditor secara dinamis
      const { default: JoditEditor } = await import('jodit-react');
      setJoditEditor(JoditEditor); // Setelah berhasil dimuat, setJoditEditor ke nilai yang didapatkan dari import()
      setJoditLoaded(true); // Setelah berhasil dimuat, set state joditLoaded menjadi true
    };

    loadComponent();
  }, []);

  // Menunggu hingga JoditEditor dimuat
  if (!joditLoaded || !JoditEditor) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <JoditEditor 
        ref={editor}
        config={config}
        value={description}
        onBlur={newDesc => setDescription(newDesc)} // Memperbarui state description saat isi editor berubah
      />
    </div>
  );
};

export default JoditHandle;