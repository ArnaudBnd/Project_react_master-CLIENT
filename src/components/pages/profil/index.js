import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUserProfil, postToUpdateProfil } from './actions/index'

class Profil extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      email: '',
      passwordDigest: '',
      id: '',
      updateProfil: ''
    }

    this.getProfil = this.getProfil.bind(this)
    this.handleUsernameChange = this.handleUsernameChange.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.updateProfile = this.updateProfile.bind(this)
  }

  componentDidMount() {
    this.getProfil()
  }

  /**
   * Display profil user auth
   * Action getUserProfil triggered
   */
  getProfil() {
    const { auth } = this.props
    const identifier = auth.auth.id

    getUserProfil(identifier).then((res) => {
      if (res) {
        this.setState({
          username: res.username,
          email: res.email,
          passwordDigest: res.password_digest,
          id: res.id
        })
      }
    })
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value })
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value })
  }

  handlePasswordChange(e) {
    this.setState({ passwordDigest: e.target.value })
  }

  updateProfile() {
    postToUpdateProfil(this.state).then(() => {
      this.setState({
        updateProfil: 'Le profil à été changé'
      })
    })
  }

  render() {
    const {
      username,
      email,
      passwordDigest,
      updateProfil
    } = this.state

    return (
      <div className="col-md-6 col-md-offset-3">
        <div className="form-area">
          <form>
            <br />
            <div className="form-group">
              <p>Username</p>
              <input value={username} type="text" onChange={this.handleUsernameChange} className="form-control" placeholder="Name" required />
            </div>
            <div className="form-group">
              <p>email</p>
              <input value={email} type="email" onChange={this.handleEmailChange} className="form-control" placeholder="email" required />
            </div>
            <div className="form-group">
              <p>password</p>
              <input value={passwordDigest} onChange={this.handlePasswordChange} type="password" className="form-control" placeholder="Password" required />
            </div>
            <button type="button" onClick={this.updateProfile} id="submit" name="submit" className="btn btn-primary pull-right">Update</button>
          </form>
          { updateProfil }
        </div>
      </div>
    )
  }
}

/**
 * mapStateToProps
 * Me permet de récupére la state du store (ici auth)
 * Et le passe en paramètre dans les props avec connect(props, actions)
 * De sorte a pourvoir vérifier si l'utilisateur est connecté
 */
function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, null)(Profil)
