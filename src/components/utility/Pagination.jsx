import React from 'react'

function Pagination({totalPosts, postPerPage, setCurrentPage}) {
    let pages = [];

    for(let i = 1; i <= Math.ceil(totalPosts/postPerPage); i++){
        pages.push(i);
    }
  return (
    <section className='pagination'>
        {
            pages.map((page, index) => {
                return <button key={index} onClick={() => setCurrentPage(page)}>{page}</button>
            })
        }
    </section>
  )
}

export default Pagination;