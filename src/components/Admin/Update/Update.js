import React, {useState} from "react";
import s from './Update.module.css';
import {_axios} from "../../../axios/_axios";
import {FormControl, InputLabel, MenuItem, Select} from '@material-ui/core';
import FileBase64 from "react-file-base64";
import {Editor} from "@tinymce/tinymce-react";

const Update = () => {
  const [page, setPage] = useState({desc: '', title: '', gallery: []});
  const [tab, setTab] = useState('');
  const [data, setData] = useState();
  const [index, setIndex] = useState('');

  const handleEditorChange = (content, editor) => {
    setPage({...page, desc: content})
  }
  const handleTitle = ({target}) => {
    setPage({...page, title: target.value})
  }
  const handleGallery = (files) => {
    console.log(files)
    if (files.length) {
      setPage({...page, gallery: Buffer.from(files[0].base64, "base64"), value: files[0].value})
    }
  }
  const handleSubmit = () => {
    console.log('handleSubmit ===', tab + '/' + data[index]._id, page)
    const token = localStorage.getItem('_token');
    if (page.gallery.length && page.title && page.desc) {
      _axios.patch(tab + '/' + data[index]._id, page, {headers: {authorization: 'bear ' + token}})
        .then(res => {
          console.log(res)
        }).catch(e => console.log(e))
    } else {
      alert("Заповніть всі поля")
    }
  }

  const handleChangeTab = (e) => {
    setTab(e.target.value)
    setIndex('')
    setPage({})
    _axios.get(`/${e.target.value}`).then(({data}) => {
      setData(data)
    }).catch(e => console.log(e))
  }

  const handleIndex = (e) => {
    setIndex(e.target.value)
    // const {title, desc, gallery} = data[e.target.value]
    const singleData = data[e.target.value]
    // setPage({...page, title, desc, gallery})
    setPage({...page, ...singleData})
  }

  return (
    <div>
      <h2 className={s.title}>
        Редагування
      </h2>
      <div className={s.table_list}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel>Виберіть, що редагувати</InputLabel>
          <Select
            error={!tab}
            value={tab ?? ''}
            onChange={handleChangeTab}
            label="Виберіть, що редагувати"
          >
            <MenuItem value={'news'}>Новини</MenuItem>
            <MenuItem value={'science_process'}>Навчальний процес</MenuItem>
            <MenuItem value={'science_activity'}>Навчальна діяльність</MenuItem>
            <MenuItem value={'science'}>Наука</MenuItem>
            <MenuItem value={'people'}>Викладачі</MenuItem>
            <MenuItem value={'vstup'}>Вступникам</MenuItem>
            <MenuItem value={'reviews'}>Відгуки</MenuItem>
            <MenuItem value={'blog'}>Блог</MenuItem>
            <MenuItem value={'pages'}>Головна</MenuItem>
          </Select>
        </FormControl>
      </div>
      {data && <div className={s.table_list}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel>Виберіть сторінку</InputLabel>
          <Select
            error={!index}
            value={index}
            // value={data[index]?.title ?? ''}
            onChange={handleIndex}
            label="Виберіть сторінку"
          >
            {data.length && data?.map((option, i) => {
                return <MenuItem key={i} value={`${i}`}>{option.title || option.fName + ' ' + option.sName}</MenuItem>
              }
            )}
          </Select>
        </FormControl>
      </div>}
      {index && <div className={s.container}>

        <h3>{page.title ? 'Заголовок' : "Ім'я"}</h3>
        <input
          className={s.title_input}
          value={page.title || page.fName}
          type={'text'}
          onChange={handleTitle}/>

        {page.sName && <>
          <h3>Прізвище</h3>
          <input
            className={s.title_input}
            value={page.title || page.sName}
            type={'text'}
            onChange={handleTitle}/>
        </>}

        <h3>Фото</h3>
        <FileBase64 multiple={true} onDone={handleGallery}/>
        {Array.isArray(page.gallery)
          ? <img
            className={s.img_view}
            src={`data:${page?.gallery[0]?.contentType};base64,${Buffer.from(page?.gallery[0]?.data, 'base64').toString('base64')}`}
            alt={'photos'}
            defaultValue={data[index]?.gallery}/>
          : <img
            className={s.img}
            alt={'news_photo'}
            src={`data:image/${page.gallery.data && Buffer.from(page.gallery.data).toString('base64').split('/')[1].split('base64')[0]};base64,${page.gallery.data && Buffer.from(page.gallery.data).toString('base64').split('base64')[1]}`}/>}
        <h3>Опис</h3>
        <Editor
          initialValue={page.desc}
          value={page.desc}
          init={{
            image_advtab:true,
            height: 500,
            menubar: false,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount'
            ],
            toolbar: 'undo redo | image | formatselect | bold italic backcolor | \
              alignleft aligncenter alignright alignjustify | \
              bullist numlist outdent indent | removeformat | help'
          }}
          onEditorChange={handleEditorChange}
        />
      </div>}
      <button className={s.btn} onClick={handleSubmit}>Редагувати</button>
    </div>
  );
}

export default Update;
