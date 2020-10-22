import React, { useState, useRef, useCallback } from 'react';
import './styles.css';
import GlobalService from './api/globalService';
import axios from 'axios';
import { DetailModal } from './components/DetailModal';

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
      <div className="container py-5">
        <div className="row text-center mb-5">
          <div className="col-lg-12 mx-auto block">
              <h1 className="display-4 title-text">Starship List</h1>
          </div>
          <div className="col-lg-8 mx-auto mt-3 block">
          <form className="form-inline d-flex justify-content-center md-form form-sm">
            <input className="form-control form-control-sm mr-3 w-75" type="text" placeholder="Search"
              aria-label="Search" value={query} onChange={handleSearch} />
          </form>
          </div>
        </div>
          {!search && starships.map((starship, index) => {
            if(starships.length === index+1){
              return <div className="row" ref={lastElement} key={index} >
                <div className="col-lg-8 mx-auto">
                  <ul className="list-group shadow">
                    <li className="list-group-item link" onClick={() => getDetail(starship.url)}>
                      <div className="media align-items-lg-center flex-column flex-lg-row p-3">
                        <div className="media-body order-2 order-lg-1">
                          <h5 className="d-block mt-0 font-weight-bold mb-2 link">{starship.name} - <span className="text-info">Model {starship.model}</span></h5>
                          <p className="font-italic text-muted mb-0 small">{starship.passengers} Passengers | Length {starship.length} Meters | Up to {starship.cargo_capacity} Cargo Capacity</p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div> 
            }else{
              return <div className="row" key={index} >
                <div className="col-lg-8 mx-auto">
                  <ul className="list-group shadow">
                    <li className="list-group-item link" onClick={() => getDetail(starship.url)}>
                      <div className="media align-items-lg-center flex-column flex-lg-row p-3">
                        <div className="media-body order-2 order-lg-1">
                          <h5 className="d-block mt-0 font-weight-bold mb-2 link">{starship.name} - <span className="text-info">Model {starship.model}</span></h5>
                          <p className="font-italic text-muted mb-0 small">{starship.passengers} Passengers | Length {starship.length} Meters | Up to {starship.cargo_capacity} Cargo Capacity</p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div> 
            }
          })}
          {search && searchShip.map((s, index) => {
            return <div className="row" key={index} >
              <div className="col-lg-8 mx-auto">
                <ul className="list-group shadow">
                  <li className="list-group-item link" onClick={() => getDetail(s.url)}>
                    <div className="media align-items-lg-center flex-column flex-lg-row p-3">
                      <div className="media-body order-2 order-lg-1">
                        <h5 className="d-block mt-0 font-weight-bold mb-2 link">{s.name} - <span className="text-info">Model {s.model}</span></h5>
                        <p className="font-italic text-muted mb-0 small">{s.passengers} Passengers | Length {s.length} Meters | Up to {s.cargo_capacity} Cargo Capacity</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          })}
          <div className="container py-5">
            <div className="row text-center mb-5">
              <div className="col-lg-8 mx-auto mt-3 block">
                {loading && <div className="spinner-grow text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div> }
                {!loading && searchShip.length === 0 && <h3>Data not Found</h3>}
              </div>
            </div>
          </div>
          
          <div>{error && 'Error'}</div>
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
    </>
  )
}

