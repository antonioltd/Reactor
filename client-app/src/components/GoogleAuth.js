import React, { Component } from "react";
import { signIn, signOut } from "../actions";
import { connect } from "react-redux";

class GoogleAuth extends Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "179077164262-laa704f2l6s9cksrjp7ds03ua8vfuadm.apps.googleusercontent.com",
          scope: "email"
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.handleAuthChange(
            this.auth.isSignedIn.get(),
            this.auth.currentUser.get().getId()
          );
          this.auth.isSignedIn.listen(this.handleAuthChange);
        });
    });
  }

  handleAuthChange = (isSignedIn, userId) => {
    if (isSignedIn) {
      this.props.signIn(userId);
    } else if (isSignedIn === false) {
      this.props.signOut();
    }

  };

  handleSignInButtonClick = () => {
    this.auth.signIn();
  };

  handleSignOutButtonClick = () => {
    this.auth.signOut();
  };
  renderAuthButton = () => {
    const { isSignedIn } = this.props;

    if (isSignedIn === null) {
      return null;
    }
    if (isSignedIn) {
      return (
        <div>
          <button
            onClick={this.handleSignOutButtonClick}
            className="ui primary button"
          >
            Sign Out
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <button
            onClick={this.handleSignInButtonClick}
            className="ui primary button"
          >
            Sign In
          </button>
        </div>
      );
    }
  };

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = state => {
 
  return {
    isSignedIn: state.auth.isSignedIn,
    userId: state.auth.userId
  };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
