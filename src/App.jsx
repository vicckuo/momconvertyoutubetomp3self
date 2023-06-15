import axios from 'axios';
import { useRef, useState } from 'react';
import { youtube_parser } from './utils';

function App() {
  const inputUrlRef = useRef();
  const [urlResult, setUrlResult] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    const youtubeID = youtube_parser(inputUrlRef.current.value);
    // console.log(youtubeID);
    const options = {
      method: 'get',
      url: 'https://youtube-mp36.p.rapidapi.com/dl',
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RAPID_YTAPI_KEY,
        'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com',
      },
      params: {
        id: youtubeID,
      },
    };

    axios(options)
      .then((res) => setUrlResult(res.data.link))
      .catch((err) => console.log(err));

    inputUrlRef.current.value = '';
  };
  return (
    <div className='app'>
      <a
        href='/'
        className='logo'
      >
        <img
          className='logo_img'
          src='/mom.jpg'
        ></img>
        My mom can&apos;t convert mp3.. God!!!
      </a>
      <section className='content'>
        <h1 className='content_title'>
          媽媽專用 <br />
          自助YouTube一鍵轉mp3(無廣告)
        </h1>
        <p className='content_description'>
          貼上YouTube網址點一下，立即轉換成mp3 <br />
          (每天50次轉換次數，請節約使用)
        </p>

        <form
          onSubmit={handleSubmit}
          className='form'
        >
          <input
            ref={inputUrlRef}
            placeholder='請在這裡貼上 YouTube 網址'
            type='text'
            className='form_input'
          />

          <button
            type='submit'
            className='form_button'
          >
            送出
          </button>
        </form>

        {urlResult ? (
          <a
            href={urlResult}
            className='download_btn'
            target='_blank'
            rel='noreferrer'
            download
          >
            點這裡下載 mp3
          </a>
        ) : (
          ''
        )}
      </section>
    </div>
  );
}

export default App;
