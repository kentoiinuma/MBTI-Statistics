import React, { useState } from 'react';
import SearchModal from './SearchModal';
import '../App.css';
import { Image, Transformation } from 'cloudinary-react';

const ImageContentPost = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [artist, setArtist] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);

  let API_URL;
  if (window.location.origin === 'http://localhost:3001') {
    API_URL = 'http://localhost:3000';
  } else if (window.location.origin === 'https://favorite-database-16type-f-5f78fa224595.herokuapp.com') {
    API_URL = "https://favorite-database-16type-5020d6339517.herokuapp.com";
  } else {
    // デフォルトのURL
    API_URL = 'http://localhost:3000';
  }

  // 検索ハンドラー
  const handleSearch = async (event) => {
    if (event.key === 'Enter' && event.target.value.trim() !== '') {
      setSearchQuery(event.target.value.trim());
      const response = await fetch(`${API_URL}/api/v1/spotify/search/${event.target.value.trim()}`);
      if (response.ok) {
        const data = await response.json();
        setArtist(data.artist);
        setModalOpen(true);
      } else {
        console.error('API request failed');
      }
    }
  };

  // モーダル内の画像クリックハンドラー
  const handleImageSelect = async (imageUrl) => {
    // 画像をアップロードするためのAPIエンドポイントにリクエストを送信します
    const response = await fetch(`${API_URL}/api/v1/upload_image`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageUrl: imageUrl[0] }) // imageUrlをリクエストボディに含める
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data); // レスポンスをログに出力
      const uploadedImageUrl = data.url;

      // 既存の画像と同じでない場合のみ追加
      if (!selectedImages.some(image => image === uploadedImageUrl)) {
        console.log(selectedImages); // selectedImages配列をログに出力
        setSelectedImages(prevImages => [...prevImages, uploadedImageUrl].slice(0, 4)); // 最大4枚まで画像を追加
      }
    } else {
      console.error('Image upload failed');
    }

    setModalOpen(false); // モーダルを閉じる
  };

  // ImageContentPost.jsxのrenderImages関数内
  const renderImages = () => {
    const containerClass = `image-container-${selectedImages.length}`;
    const imageSize = selectedImages.length === 1 ? 600 : 297.5; // 画像の数に応じて適切な画像サイズを設定

    return (
      <div className={containerClass} > 
        {selectedImages.map((url, index) => (
          <Image key={index} cloudName="dputyeqso" publicId={url} width={imageSize} height={imageSize} />
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 space-y-4">
      <div className="flex items-center space-x-2">
        <div className="relative w-full max-w-xs">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute left-3 top-1/2 transform -translate-y-1/2">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <input
            type="text"
            placeholder="好きなアーティスト名を1~4人検索してください。"
            className="input input-bordered input-info pl-12 pr-4 py-2 w-full"
            onKeyPress={handleSearch}
          />
        </div>
      </div>
      <div className="bg-black">
        {renderImages()} {/* ここで選択された画像をレンダリング */}
      </div>
      <div className="flex justify-center gap-4">
          <button type="submit" className="w-full inline-flex justify-center items-center px-4 py-2 font-bold rounded-xl focus:outline-none focus:ring-opacity-50" style={{ backgroundColor: '#2EA9DF', color: 'white', borderRadius: '50px' }}>
            ポストする
          </button>
      </div>
      <SearchModal 
        isOpen={isModalOpen} 
        searchQuery={searchQuery} 
        artist={artist} 
        onImageSelect={handleImageSelect} 
        onClose={() => setModalOpen(false)} 
      />
    </div>
  );
};

export default ImageContentPost;