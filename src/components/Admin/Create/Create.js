import React, {useState} from "react";
import s from './Create.module.css';
import {FormControl, InputLabel, MenuItem, Select, TextField} from '@material-ui/core';
import FileBase64 from "react-file-base64";
import {Editor} from "@tinymce/tinymce-react";
import {_axios} from "../../../axios/_axios";

const Create = () => {
  const [page, setPage] = useState({desc: '', title: '', gallery: []});
  const [tab, setTab] = useState('');

  const handleEditorChange = (content, editor) => {
    setPage({...page, desc: content})
  }
  const handleTitle = ({target}) => {
    setPage({...page, title: target.value})
  }
  const handleShortDesc = ({target}) => {
    setPage({...page, short_desc: target.value})
  }
  const handleGallery = (files) => {
    console.log(Buffer.from(files[0].base64))
    if (files.length) {
      setPage({...page, gallery: Buffer.from(files[0].base64, "base64"), value: files[0].value})
    }
  }
  const handleSubmit = () => {
    console.log('handleSubmit ===', tab)
    const token = localStorage.getItem('_token');
    console.log(page.gallery)
    if (page.gallery.length && page.title && page.desc) {
      _axios.post(tab, page, {headers: {authorization: 'bear ' + token}})
        .then(res => {
          res.status === 200 && alert('Створення успішне')
          console.log(res)
        }).catch(e => console.log(e) && alert("Сталася помилка"))
    } else {
      alert("Заповніть всі поля")
    }
  }

  const handleChangeTab = (e) => {
    setTab(e.target.value)
  }
  console.log(page)

  return (
    <div>
      <h2 className={s.title}> Створення </h2>
      <div className={s.table_list}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel>Виберіть, що створювати</InputLabel>
          <Select
            error={!tab}
            value={tab ?? ''}
            onChange={handleChangeTab}
            label="Виберіть, що створювати"
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
      {tab && <div className={s.container}>
        {/*<h3>Заголовок</h3>*/}
        {/*<input className={s.title_input} value={page.title} type={'text'}*/}
        {/*       onChange={handleTitle}/>*/}
        <TextField
          label={'Заголовок'}
          variant="outlined"
          size={'small'}
          type={'search'}
          fullWidth
          error={!page.title}
          value={page.title}
          onChange={handleTitle}
        />
        {(tab === 'news' || tab === 'Science_activity') &&
        <div className={s.short_desc}>
          <TextField
            label={'Короткий опис'}
            variant="outlined"
            size={'small'}
            type={'search'}
            fullWidth
            error={!page.short_desc}
            value={page.short_desc}
            onChange={handleShortDesc}
          />
        </div>}
        <h3>Фото</h3>
        <FileBase64 multiple={true} onDone={handleGallery}/>
        <img className={s.img_view}
             src={page.gallery}
          //    src={`data:${page?.gallery?.contentType};base64,${Buffer.from(page.gallery?.data, 'base64').toString('base64')}`}
             alt={'photos'}/>

        <h3>Опис</h3>
        <Editor
          initialValue={page.desc}
          value={page.desc}
          apiKey='42g6dqq1pkropr8mmiygujgq2ij57udq8rb8im2rmwti3ysm'
          init={{
            height: 500,
            menubar: false,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount'
            ],
            toolbar: 'undo redo | image | formatselect | bold italic backcolor | \
              alignleft aligncenter alignright alignjustify | \
              bullist numlist outdent indent | removeformat | help',
            // file_picker_callback: (cb, meta, value) => {
            //   if (meta.filetype === 'image') {
            //     cb('myimage.jpg', {alt: 'My alt text'});
            //   }
            //   console.log(meta)
            //   console.log(value)
            // },
            images_upload_handler: (blobInfo, success, failure, progress) => {
              console.log(blobInfo.filename())

              const formData = new FormData();
              formData.append('gallery', blobInfo.blob(), blobInfo.filename());
              _axios.post('http://localhost/api/v1/news/upload', formData, {
                headers: {'Content-Type': 'multipart/form-data'}
              }).then(({data})=>{
                success(data)
              }).catch(e=>{
                failure(e)
                console.log(e)
              })

            }
          }}
            onEditorChange={handleEditorChange}
            />
            </div>}
            <button className={s.btn} onClick={handleSubmit}>Створити</button>
            </div>
            );
            }

            export default Create;
