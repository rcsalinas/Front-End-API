import React, { useRef, useState, useEffect } from "react";

import { MDBBtn } from "mdb-react-ui-kit";
import "./ImageUpload.css";
import { MDBCard } from "mdb-react-ui-kit";

const ImageUpload = (props) => {
	const [file, setFile] = useState();
	const [previewUrl, setPreviewUrl] = useState();
	const [isValid, setIsValid] = useState(false);

	const filePickerRef = useRef();

	useEffect(() => {
		if (!file) {
			return;
		}
		const fileReader = new FileReader();
		fileReader.onload = () => {
			setPreviewUrl(fileReader.result);
		};
		fileReader.readAsDataURL(file);
	}, [file]);

	const pickedHandler = (event) => {
		let pickedFile;
		let fileIsValid = isValid;
		if (event.target.files && event.target.files.length === 1) {
			pickedFile = event.target.files[0];
			setFile(pickedFile);
			setIsValid(true);
			fileIsValid = true;
		} else {
			setIsValid(false);
			fileIsValid = false;
		}
		props.onInput(props.id, pickedFile, fileIsValid);
	};

	const pickImageHandler = () => {
		filePickerRef.current.click();
	};

	return (
		<MDBCard style={{ backgroundColor: "transparent" }}>
			<input
				id={props.id}
				ref={filePickerRef}
				style={{ display: "none" }}
				type="file"
				accept=".jpg,.png,.jpeg"
				onChange={pickedHandler}
			/>

			<div className="image-upload__preview">
				{previewUrl && <img src={previewUrl} alt="Preview" />}
				{!previewUrl && <p>Elegir Imagen (Opcional)</p>}
			</div>

			<MDBBtn
				type="button"
				onClick={pickImageHandler}
				style={{
					marginTop: "1%",
					marginLeft: "30%",
					marginRight: "30%",
					marginBottom: "1%",
				}}
			>
				PICK IMAGE
			</MDBBtn>

			{!isValid && <p style={{ textAlign: "center" }}>{props.errorText}</p>}
		</MDBCard>
	);
};

export default ImageUpload;
