// Write your code here
import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {
    countmin: 25,
    countSec: 0,
    isActive: false,
    countTimer: 25,
    isCompleted: false,
    isReset: true,
  }

  clearCounter = () => {
    this.setState(prevState => ({
      isActive: !prevState.isActive,
    }))
    clearInterval(this.timerCount)
  }

  ResetTimer = () => {
    const {countTimer, isActive} = this.state
    if (isActive) {
      this.clearCounter()
    } else {
      clearInterval(this.timerCount)
    }
    this.setState({
      countmin: countTimer,
      countSec: 0,
      isCompleted: false,
      isReset: true,
    })
  }

  Updatetime = () => {
    const {countmin, countSec} = this.state
    if (countSec === 0 && countmin !== 0) {
      this.setState(prevState => ({
        countmin: prevState.countmin - 1,
        countSec: 59,
      }))
    } else if (countmin === 0 && countSec === 0) {
      this.clearCounter()
      this.setState({isCompleted: true})
    } else {
      this.setState(prevState => ({countSec: prevState.countSec - 1}))
    }
  }

  startorpause = () => {
    const {isActive, isCompleted, countTimer, isReset} = this.state
    if (isCompleted) {
      this.setState({countmin: countTimer, countSec: 0, isCompleted: false})
    }
    if (isReset) {
      this.setState({isReset: false})
    }
    if (!isActive) {
      this.timerCount = setInterval(this.Updatetime, 1000)
      this.setState(prevState => ({
        isActive: !prevState.isActive,
      }))
    } else {
      this.clearCounter()
    }
  }

  incrementCount = () => {
    const {isActive, isReset} = this.state
    if (!isActive) {
      if (isReset) {
        this.setState(prevState => ({
          countTimer: prevState.countTimer + 1,
          countmin: prevState.countmin + 1,
        }))
      } else {
        this.setState(prevState => ({countTimer: prevState.countTimer + 1}))
      }
    }
  }

  decrementCount = () => {
    const {isActive, isReset} = this.state
    if (!isActive) {
      if (isReset) {
        this.setState(prevState => ({
          countTimer: prevState.countTimer - 1,
          countmin: prevState.countmin - 1,
        }))
      } else {
        this.setState(prevState => ({countTimer: prevState.countTimer - 1}))
      }
    }
  }

  render() {
    const {countmin, countSec, isActive, countTimer} = this.state
    const TextStatus = isActive ? 'Running' : 'Paused'
    const StatusText = isActive ? 'Pause' : 'Start'
    const iconAlt = isActive ? 'pause icon' : 'play icon'
    const iconUrl = isActive
      ? ' https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const second = countSec <= 9 ? `0${countSec}` : countSec
    const minute = countmin <= 9 ? `0${countmin}` : countmin
    return (
      <div className="main-card column-display">
        <h1>Digital Timer</h1>
        <div className="counter">
          <div className="first-card">
            <div className="timer-background column-display">
              <div className="counter-card column-display">
                <h3 className="counter-text">{`${minute}:${second}`}</h3>
                <p className="counter-text">{TextStatus}</p>
              </div>
            </div>
          </div>
          <div className="second-card">
            <div className="icon-btn-container row-display">
              <button
                type="button"
                className="icon-btn row-display"
                onClick={this.startorpause}
              >
                <img src={iconUrl} alt={iconAlt} className="icon-image" />
                {StatusText}
              </button>
              <button
                type="button"
                className="icon-btn row-display"
                onClick={this.ResetTimer}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="icon-image"
                />
                Reset
              </button>
            </div>
            <p>Set Timer Limit</p>
            <div className="change-count row-display ">
              <button
                type="submit"
                className="symbol-btn"
                onClick={this.decrementCount}
              >
                -
              </button>
              <p className="count-text">{countTimer}</p>
              <button
                type="submit"
                className="symbol-btn"
                onClick={this.incrementCount}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
