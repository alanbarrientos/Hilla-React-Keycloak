import {useForm} from "@hilla/react-form";
import ImageModel from "Frontend/generated/com/example/application/entity/ImageModel";
import {ImageService} from "Frontend/generated/endpoints";
import React, {useEffect, useState} from "react";
import {Upload} from "@hilla/react-components/Upload";
import {Button} from "@hilla/react-components/Button.js";
import { readAsDataURL } from "promise-file-reader";
import { UploadBeforeEvent } from "@vaadin/upload";
import Image from "Frontend/generated/com/example/application/entity/Image";

export default function UserView() {
    const [image, setImage] = useState('')

    const form = useForm(ImageModel, {
        onSubmit: async (image) => {
            await ImageService.saveImage(image);
        }
    });

    useEffect(() => {
        ImageService.getImage().then(form.read);
        ImageService.getImage().then((value:Image) => {setImage(value.imageBase64!)})
    }, [])
    return (
        <div className="flex flex-col h-full items-center justify-center p-l text-center box-border">
            <img style={{ width: '200px' }} src="images/empty-plant.png" />
            <h2>User view</h2>
        </div>
        // <div>
        //     <h2>Need to be corrected I pass for now to make other things</h2>
        //     <img src={form.value?.imageBase64} alt="image"></img>
        //     <Upload capture="camera" accept="image/*" max-files="1"
        //             onUploadBefore={async (e: UploadBeforeEvent) => {
        //                 const file = e.detail.file;
        //                 e.preventDefault();
        //                 if (form.value) {
        //                     form.value.imageBase64 = await readAsDataURL(file);
        //                 }
        //             }}></Upload>
        //     <Button onClick={form.submit}>Save</Button>
        // </div>
    );
}