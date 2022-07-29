import React, { useState, useEffect, useContext  } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import Header from "./Header";
import Footer from "./Footer";




function Home() {

  const [data, setData] = useState([]);
  const [pageNum, setPage] = useState(100);

  
  

  function fetchMoreData ()
   {
    setTimeout(() => {
    let Url = 'https://randomuser.me/api/?results='+pageNum;
    setPage(pageNum+1);
    fetch(Url)
       .then(res=>res.json())
       .then(newdata => {
          const d=newdata.results;
          setData([...data,...d])
         
       })
      }, 1500);
      
    }
    useEffect(()=>{
      fetchMoreData();
     },[])
  
  return (
    <div>
      <Header />
      <InfiniteScroll
          dataLength={data.length}
          next={() => {
            fetchMoreData();
     }}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          {data.map(contact => (
            
            <div className="list" >
            
            <div className="col-md-4 animated fadeIn" key={contact.id.value}>
        <div className="card">
          <div className="card-body">
            <div className="avatar">
              <img
                src={contact.picture.large}
                className="card-img-top"
                alt=""
              />
            </div>
            <h5 className="card-title">
              {contact.name.first +
                " " +
                contact.name.last}
            </h5>
            <p className="card-text">
              {contact.location.city +
                ", " +
                contact.location.state}
              <br />
              <span className="phone">{contact.phone}</span>
            </p>
          </div>
        </div>
      </div>
            </div>
          ))}
        </InfiniteScroll>
      <Footer />
    </div>
  );
}

export default Home;
