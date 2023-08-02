import React from 'react'

interface Modal {
  showModal: VoidFunction,
  close: VoidFunction
}
declare global {
  interface Window {
      new_post_modal: Modal
  }
}

function PostForm () {

  function openModal() {
    window.new_post_modal.showModal()
  }

  function handleClose() {
    window.new_post_modal.close()
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    window.new_post_modal.close()
  }

  return (
    <div className='modal modal-open'>
      <button className='btn' onClick={openModal}>New Post</button>
      <dialog id='new_post_modal' className='modal-box' >
        <h3>New Post</h3>
        <form method='dialog' onSubmit={handleSubmit} >
          <div className='flex flex-col'>
            <label>Title</label>
            <input
              type='text'
            />
            <textarea

            />
          </div>
          <button type='submit' className='btn'>Submit</button>
          <button onClick={handleClose}>Close</button>
        </form>
      </dialog>
    </div>
  )
}

export default PostForm