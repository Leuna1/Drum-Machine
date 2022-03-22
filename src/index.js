import * as React from "https://cdn.skypack.dev/react@17.0.1";
import * as ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";

class DrumOptions extends React.Component {
  render() {
    const availableList = this.props.availableAudios.map((x, index) => {
      return (
        <li key={x.id}>
          <button onClick={() => this.props.changeTrack(this.props.padKey, index)} type="button" class={this.props.currentAudio === x.name ? "dropdown-item active" : 'dropdown-item'}>
            {x.name}
          </button>
        </li>)
    });
    return (
      <div className="drum-options-toggle">
        <button type="button" className="btn btn-secondary dropdown-toggle" onClick={() => this.props.showOptions(this.props.optionIndex)}>
        </button>
        <ul className={this.props.optionShown[this.props.optionIndex] ? 'dropdown-menu show' : 'dropdown-menu'}>
          {availableList}
        </ul>
      </div>
    )
  }
}

class DrumPad extends React.Component {

  render() {
    const audioSource = "https://docs.google.com/uc?export=download&id=" + this.props.audioId;
    return (
      <div clas="drum-pad-container">
        <button type="button" className="btn btn-secondary drum-pad" onClick={() => { this.props.handleClick(this.props.pressKey) }} id={this.props.padName.replace(' ', '_')}>
          {this.props.pressKey}
          <audio id={this.props.pressKey} className="clip" src={audioSource} preload />
        </button>
        <DrumOptions optionShown={this.props.optionShown} optionIndex={this.props.optionIndex} showOptions={this.props.showOptions} padKey={this.props.pressKey} changeTrack={this.props.changeTrack} currentAudio={this.props.padName} availableAudios={this.props.availableAudios} />
      </div>
    )
  }
}


class Drum extends React.Component {
  constructor(props) {
    super(props);
    this.availableAudios = [
      { id: '14cYimnLs3w8dC3xZ58MBOnlzQQ6suwVV', name: 'pe ho' },
      { id: '1Jck3DjtpZ0frpj0wVbbCAKLeM4-OqM2O', name: 'pe med' },
      { id: '1BnLINu6KxZ8G_Iey5oB0nYRJkXH2I8Yv', name: 'pe hi' },
      { id: '1uL8_lo0cR0zrcjiTqGaDYM4ZY1MmDlby', name: 'bendy' },
      { id: '1ZJG6zkxpK9GxVJaid1J0urOuwkkoYB0F', name: 'big bend' },
      { id: '1HWd52TaPWO0uXt0epnzd2uxkvMz6E5lm', name: 'blobble' },
      { id: '1Dlyqra0S4_lOizEDjjwH0JibIrjVRe1Y', name: 'bongo lo' },
      { id: '1mZ938_hanBxvy9GyWKwo0syPYbpMXKz6', name: 'bongo hi' },
      { id: '183ExWqv2L4AEFwLn5A39ud0gG1c0Ft0o', name: 'djembe side' },
      { id: '1M2bqxF3AQTfVm1iVjVSBqz4S8333HhKg', name: 'electrotabla' },
      { id: '1H8c0-a9LSa-lXUOa-0he1GdTd3Zqe6rv', name: 'ethnowhat' },
      { id: '1lbMctcgar2-QrWcWwqNEH1TOWVdKfhHi', name: 'tabla dum' },
      { id: '1GThWVSTpb9Fy7V-a_X6ACZSFs67p62fz', name: 'tabla hardhit' },
      { id: '1dDgzhY-fAXCs98mVeddk7rgZpNBYc0CB', name: 'tambo dum' },
      { id: '1xckg49wSUtS_3GgSIptT2qgQIOJKXiki', name: 'tambo tak' },
      { id: '1kJ-SoQV4SpgLf0_j7KNDts24VLHp0Ydh', name: 'verby cajon bass' },
      { id: '1Usuioh99br6Ox9s8daoVPonqVMrn6x0G', name: 'verby cajon low' },
      { id: '1wC1YGIgiVTzLIs9Aei6S14ZBH7vNuS75', name: 'verby cajon high' },
    ]
    this.state = {
      currentSound: '',
      optionShown: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ],
      audioList: [
        { padKey: 'Q', audio: 0 },
        { padKey: 'W', audio: 1 },
        { padKey: 'E', audio: 2 },
        { padKey: 'A', audio: 3 },
        { padKey: 'S', audio: 4 },
        { padKey: 'D', audio: 5 },
        { padKey: 'Z', audio: 6 },
        { padKey: 'X', audio: 7 },
        { padKey: 'C', audio: 8 },
      ]
    }
    this.handleClick = this.handleClick.bind(this);
    this.showOptions = this.showOptions.bind(this);
    this.changeTrack = this.changeTrack.bind(this);
    this.handleOnKeyDown = this.handleOnKeyDown.bind(this);
  }

  showOptions(optionIndex) {
    let newOptionShown = this.state.optionShown.map((x, index) => {
      if (index === optionIndex) {
        return !x;
      }
      return false;
    })
    this.setState({
      optionShown: newOptionShown
    })
  }

  changeTrack(padKey, audioIndex) {
    let newList = this.state.audioList.map((x) => {
      if (x.padKey === padKey) {
        return { padKey: padKey, audio: audioIndex };
      }
      return x;
    });
    this.setState({
      audioList: newList
    });
  }

  handleClick(pressKey) {
    const audio = document.getElementById(pressKey);
    if (audio.paused) {
      audio.play();
    } else {
      audio.currentTime = 0;
    }
    this.setState({
      currentSound: this.availableAudios[this.state.audioList.filter(x => x.padKey === pressKey)[0].audio].name
    })
  }

  handleOnKeyDown(event) {
    if (!event.key)
      return;
    if (['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C'].includes(event.key.toUpperCase())) {
      this.handleClick(event.key.toUpperCase())
    }
  }

  render() {
    document.addEventListener('keydown', this.handleOnKeyDown);
    const drumPads = this.state.audioList.map((x, index) => {
      return <DrumPad optionIndex={index} optionShown={this.state.optionShown} showOptions={this.showOptions} 
                changeTrack={this.changeTrack} availableAudios={this.availableAudios} pressKey={x.padKey} 
                handleClick={this.handleClick} padName={this.availableAudios[x.audio].name} 
                audioId={this.availableAudios[x.audio].id} 
              />
    });
    return (
      <div id="drum-machine" className="align-self-center">
        <div id="display">
          {this.state.currentSound}
        </div>
        {drumPads.slice(0, 9)}
      </div>
    )
  }
}

class AppWrapper extends React.Component {

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-10 offset-1  justify-content-center h-100">
            <h1 className="text-center title">Drum Machine</h1>
            <Drum />
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<AppWrapper />, document.getElementById("root"));