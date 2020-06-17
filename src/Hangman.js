import React from 'react'
import './css/hangman.sass'


import img0 from './img/0.png'
import img1 from './img/1.png'
import img2 from './img/2.png'
import img3 from './img/3.png'
import img4 from './img/4.png'
import img5 from './img/5.png'
import img6 from './img/6.png'



class Hangman extends React.Component {

  state = {
    letters: [],
    win: false,
    loose: false,
    passwordHidden: '',
  }
  images = [img0, img1, img2, img3, img4, img5, img6];
  letters = ['a', 'ą', 'b', 'c', 'ć', 'd', 'e', 'ę', 'f', 'g', 'h',
    'i', 'j', 'k', 'l', 'ł', 'm', 'n', 'ń', 'o', 'ó', 'p', 'q', 'r',
    's', 'ś', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'ź', 'ż']
  missCounter = 0;
  password = {
    password: "cameron diaz",
    hint: "jasnowłosa aktorka"
  }
  password2 = this.password.password.toLowerCase().split("");


  hidePassword = () => {
    let pass = '';
    for (let i = 0; i < this.password2.length; i++) {
      if (this.password2[i] === ' ') { pass += ' ' }
      else { pass += '-' }
    }
    this.setState({ passwordHidden: pass.split("") })
  }
  clickHandle = (e) => {
    let passwordHidden = [...this.state.passwordHidden]
    const letter = e.target.textContent;
    let index = this.password2.indexOf(letter)
    if (index === -1) {
      e.target.classList.add('false');
      this.missCounter++;
      this.setState({});
      if (this.missCounter === 6) this.setState({ loose: true })
    }
    while (index !== -1) {
      e.target.classList.add('true');
      passwordHidden[index] = letter
      this.setState({ passwordHidden })
      index = this.password2.indexOf(letter, index + 1);
    }
    if (this.password2.toString() === passwordHidden.toString()) {
      this.setState({ win: true })
    }
  }
  createLetters = () => {
    let letters = [];
    for (let i = 0; i < this.letters.length; i++) {
      letters.push(
        <div className="letter"
          onClick={this.clickHandle}
          key={this.letters[i]}
          id={'letter' + [i]}>
          {this.letters[i]}
        </div>)
    }
    this.setState({ letters })
  }

  componentDidMount() {
    this.createLetters();
    this.hidePassword();
  }
  render() {
    const { win, loose, letters, passwordHidden } = this.state
    let classes = '';
    if (win) classes = 'win'
    if (loose) classes = 'loose'

    return (
      <div className="hangmanContainer">
        <div className="password">
          <h1 className={classes}>
            {!loose ? passwordHidden : this.password2}
          </h1>
          <p className="hint">Podpowiedź: {this.password.hint}</p>
        </div>
        <div className="board" >
          {letters}
          {win || loose ? <div className="shield"></div> : null}
        </div>
        <div className="imgContainer">
          <img src={this.images[this.missCounter]} alt="" />
          {win || loose ?
            <div className={classes}>
              {win && 'WYGRANA!'}
              {loose && 'PRZEGRANA!'}
            </div> : null}

        </div>
      </div >
    )
  }
}

export default Hangman;