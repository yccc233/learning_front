import React from "react";

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	componentDidCatch(error, info) {
		this.setState({ hasError: true });
		sessionStorage.removeItem("fileInfo");
	}

	render() {
		if (this.state.hasError) return <h1>页面发生了错误</h1>;
		return this.props.children;
	}
}

ErrorBoundary.propTypes = {
	// abc:PropTypes.func.isRequired,
};

export default ErrorBoundary;
