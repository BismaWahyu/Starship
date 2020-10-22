import React, { Component } from 'react';
import './../styles.css';
import image from './../assets/images/spaceship.png';

export class SearchCard extends Component{
    render(){
        return(
            <div class="card search-card">
            <div class="card-body">
                <img alt="spaceship icon" class="icon-img" src={image} />
                <h2 class="card-title text-white">Starship List</h2>
                
                <div class="row">
                    <div class="form-group col-md-10 mx-auto">
                        <input type="text" class="form-control" placeholder="Search Starship..." value={this.props.query} onChange={this.props.handle}/>
                    </div>
                    
                </div>
            </div>
        </div>
        )
    }
}