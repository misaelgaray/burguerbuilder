import React from "react";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Aux";

const withErrorHandler = (WrapedComponent, axios) => {
  return class extends React.Component {
    state = {
        error : null
    }

    componentWillMount(){
        this.reqInterceptor = axios.interceptors.request.use(req => {
            this.setState({ error: null });
            return req;
        });
        this.resInterceptor = axios.interceptors.response.use(resp => resp, error => {
            this.setState({error : error});
        });
    }

    componentWillUnmount(){
        axios.interceptors.request.eject(this.reqInterceptor);
        axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler =() =>{
        this.setState({error : null});
    }

    render() {
      return (
            <Aux>
                <Modal clicked={this.errorConfirmedHandler} show={this.state.error}>{this.state.error?this.state.error.message : null}</Modal>
                <WrapedComponent {...this.props} />
            </Aux>
      );
    }
  };
};

export default withErrorHandler;