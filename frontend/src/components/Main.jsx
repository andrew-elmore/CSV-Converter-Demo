import React from 'react';
import axios from 'axios'
import download from 'downloadjs'

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            csvURL: '',
        };

        this.name = ''
        this.handleUpload = this.handleUpload.bind(this);
    }

    handleUpload(ev) {
        ev.preventDefault();
        this.name = this.uploadInput.files[0].name
        const data = new FormData();
        data.append('file', this.uploadInput.files[0]);
        data.append('filename', 'convert');

        fetch('/api/converter/upload', {
            method: 'POST',
            body: data,
        }).then((response) => {
            this.downloadFile(response)
        });
    }

    downloadFile = async(res) => {
        const blob = await res.blob();
        download(blob, this.name);
    }

    render() {
        return (
            <div>
            <form onSubmit={this.handleUpload}>
                <div>
                    <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
                </div>
                <br />
                <div>
                    <button>Convert</button>
                </div>
            </form>
            </div>
        );
    }
}

export default Main;
