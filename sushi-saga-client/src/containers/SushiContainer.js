import React, { Fragment } from 'react'
import Sushi from '../components/Sushi'
import MoreButton from '../components/MoreButton'

const renderSushi = props => {
  const sushiJSXs = props.sushis.map(sushi => <Sushi 
    key={sushi.id}
    id={sushi.id}
    name={sushi.name}
    price={sushi.price}
    img_url={sushi.img_url}
    eaten={sushi.eaten}
    buySushi={props.buySushi}
    money={props.money}
  />)
  
  let sushiJSXArr = []

  for (let i = 0; i < 4; i++) {
    sushiJSXArr.push(sushiJSXs[(props.currentSushiIndex + i) % props.sushis.length])
  }

  return sushiJSXArr;
}

const SushiContainer = props => {
  return (
    <Fragment>
      <div className="belt">
        {renderSushi(props)}
        <MoreButton getMoreSushi={props.getMoreSushi} />
      </div>
    </Fragment>
  )
}

export default SushiContainer