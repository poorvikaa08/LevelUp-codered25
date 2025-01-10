'use client'

import  FileUploader  from "@/components/quiz/upload"
// import RetroPDFUploader from '@/components/upload/retropdf-uploader'


export default function Upload() {
    return (
        <div className="space-y-10 bt-20">
            {/* <FileUploader /> */}
            <FileUploader />
        </div>
    )

}