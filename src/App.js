import React, { useState, useRef, useCallback } from 'react';
import './styles.css';
import img from './assets/images/image.jpg';
import GlobalService from './api/globalService';
import axios from 'axios';
import { DetailModal } from './components/DetailModal';
import { SearchCard } from './components/SearchCard';
import { Container, Button, darkColors, lightColors } from 'react-floating-action-button';

export default function App(){
  const [query, setQuery] = useState('')
  const [pageNumber, setPageNumber] = useState(1)
  const [detail, setDetail] = useState([])
  const [modal, setModal] = useState(false)
  const [name, setName] = useState('')
  const [classes, setClass] = useState('')
  const [cargo, setCargo] = useState('')
  const [passenger, setPassenger] = useState('')
  const [manufacture, setManufacture] = useState('')
  
  const {loading, error, starships, page, search, searchShip} = GlobalService(query, pageNumber);
  
  const observer = useRef()
  const lastElement = useCallback(node => {
    if(loading) return
    if(observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting && page < 5){
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })
    if(node) observer.current.observe(node)
  }, [loading, page])
  
  function handleSearch(e){
    setQuery(e.target.value)
    setPageNumber(1)
  }
  
  const scrollTop = () =>{
    window.scrollTo({top: 0, behavior: 'smooth'});
  };
  
  const getDetail = url_detail => {
    axios ({
      method: 'GET',
      url: url_detail
    }).then(res => {
        setDetail(res.data.results)
        console.log(res.data)
        setName(res.data.name)
        setClass(res.data.starship_class)
        setCargo(res.data.cargo_capacity)
        setPassenger(res.data.passengers)
        setManufacture(res.data.manufacturer)
    })
    setModal(true);
  }
  
  let modalClose = () => setModal(false);

  return (
    <>
      <SearchCard query={query} handle={handleSearch}/>
      
      <div className="container mt-50">
        <div className="row">
          {!search && starships.map((starship, index) => {
            if(starships.length === index+1){
              return <div className="col-xs-12 col-sm-6 col-md-3 mb-4" ref={lastElement} key={index}>
              <div className="col-item">
                <div className="post-img-content">
                  <img src={img} alt="starhip" className="img-responsive" />
                  <span className="post-title">
                      <b>{starship.consumables}</b>
                  </span>
                  <span className="round-tag">
                    {starship.hyperdrive_rating}
                    <i className="fa fa-star"></i>
                  </span>
                </div>
                <div className="info">
                  <div className="row">
                    <div className="model col-md-12">
                      <h5 className="starship-name"> {starship.name}</h5>
                      <h5 className="model-text-color">{starship.model} Models</h5>
                    </div>
                    
                    <div className="separator clear-left full-width link" onClick={() => getDetail(starship.url)}>
                      <p className="btn-details">
                        <i className="fa fa-list"></i>
                        <span className="hidden-sm detail-link">More details</span>
                      </p>
                    </div>
                    <div className="clearfix">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }else{
            return <div className="col-xs-12 col-sm-6 col-md-3 mb-4" ref={lastElement} key={index}>
              <div className="col-item">
                <div className="post-img-content">
                  <img src={img} alt="starhip" className="img-responsive" />
                  <span className="post-title">
                      <b>{starship.consumables}</b>
                  </span>
                  <span className="round-tag">
                    {starship.hyperdrive_rating}
                    <i className="fa fa-star"></i>
                  </span>
                </div>
                <div className="info">
                  <div className="row">
                    <div className="model col-md-12">
                      <h5 className="starship-name"> {starship.name}</h5>
                      <h5 className="model-text-color">{starship.model} Models</h5>
                    </div>
                    
                    <div className="separator full-width link" onClick={() => getDetail(starship.url)}>
                      <p className="btn-details">
                        <i className="fa fa-list"></i>
                        <span className="hidden-sm detail-link">More details</span>
                      </p>
                    </div>
                    <div className="clearfix">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
        })}
        
        {search && searchShip.map((s, index) => {
          return <div className="col-xs-12 col-sm-6 col-md-3 mb-4" key={index}>
              <div className="col-item">
                <div className="post-img-content">
                  <img src={img} alt="starhip" className="img-responsive" />
                  <span className="post-title">
                      <b>{s.consumables}</b>
                  </span>
                  <span className="round-tag">
                    {s.hyperdrive_rating}
                    <i className="fa fa-star"></i>
                  </span>
                </div>
                <div className="info">
                  <div className="row">
                    <div className="model col-md-12">
                      <h5 className="s-name"> {s.name}</h5>
                      <h5 className="model-text-color">{s.model} Models</h5>
                    </div>
                    
                    <div className="separator clear-left full-width link" onClick={() => getDetail(s.url)}>
                      <p className="btn-details">
                        <i className="fa fa-list"></i>
                        <span className="hidden-sm detail-link">More details</span>
                      </p>
                    </div>
                    <div className="clearfix">
                    </div>
                  </div>
                </div>
              </div>
            </div>
        })}
        
          
          <div className="container py-5">
            <div className="row text-center mb-5">
              <div className="col-lg-8 mx-auto mt-3 block">
                {loading && <div className="spinner-grow text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div> }
                {!loading && search && searchShip.length === 0 && <h3>Data not Found</h3>}
              </div>
            </div>
          </div>
          
          <div className="container py-5">
            <div className="row text-center mb-5">
              <div className="col-lg-8 mx-auto mt-3 block">
                {error && <h3>Oopps....</h3>}
              </div>
            </div>
          </div>
          
        </div>
      </div>
     
      <DetailModal
        show={modal}
        onHide={modalClose}
        title={name}
        class_ship={classes}
        cargo={cargo}
        passenger={passenger}
        manufacture={manufacture}
      />
      
      <Container>
          <Button
              tooltip="Back to Top"
              icon="fa fa-arrow-up"
              styles={{backgroundColor: darkColors.teal, color: lightColors.white}}
              rotate={false}
              onClick={scrollTop} />
      </Container>
      
    </>
  )
}

