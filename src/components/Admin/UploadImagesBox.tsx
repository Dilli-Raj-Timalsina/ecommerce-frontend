// export default function UploadImagesBox() {
//     return;
//     <div className="pl-4 pr-4 mt-4 flex items-center">
//         <div className="w-1/2">
//             <label
//                 htmlFor="binary"
//                 className="block text-gray-700 text-base font-bold  mt-4"
//             >
//                 Images
//             </label>
//             <div className="flex items-center mb-4 w-1/2 mt-2">
//                 <label
//                     htmlFor="binary-upload"
//                     className="flex-1 cursor-pointer bg-white rounded-md border-gray-300 hover:border-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500"
//                 >
//                     <svg
//                         className="w-8 h-8 text-gray-600"
//                         fill="none"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                     >
//                         <path d="M12 4v16m8-8H4" />
//                     </svg>
//                     <span className="ml-2 text-sm text-gray-600">
//                         Upload a file or drag and drop
//                     </span>
//                     <input
//                         id="binary-upload"
//                         type="file"
//                         accept="image/jpeg, image/png, image/gif"
//                         className="sr-only "
//                         onChange={handleFileUpload}
//                         multiple
//                     />
//                 </label>
//             </div>

//             <div className="p-2 mb-7 border border-gray-100 flex gap-1 items-center">
//                 {product.thumbnail != null &&
//                     product.thumbnail.map((item, key) => (
//                         <Image
//                             src={URL.createObjectURL(item)}
//                             alt="Selected File Preview"
//                             width={44}
//                             height={44}
//                             key={key}
//                         />
//                     ))}
//             </div>
//         </div>
//         <div className="w-1/2">
//             <label
//                 htmlFor="binary"
//                 className="block text-gray-700 text-base font-bold  mt-4"
//             >
//                 Images
//             </label>
//             <div className="flex items-center mb-4 w-1/2 mt-2">
//                 <label
//                     htmlFor="binary-upload"
//                     className="flex-1 cursor-pointer bg-white rounded-md border-gray-300 hover:border-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500"
//                 >
//                     <svg
//                         className="w-8 h-8 text-gray-600"
//                         fill="none"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                     >
//                         <path d="M12 4v16m8-8H4" />
//                     </svg>
//                     <span className="ml-2 text-sm text-gray-600">
//                         Upload a file or drag and drop
//                     </span>
//                     <input
//                         id="binary-upload"
//                         type="file"
//                         accept="image/jpeg, image/png, image/gif"
//                         className="sr-only "
//                         onChange={handleFileUpload}
//                         multiple
//                     />
//                 </label>
//             </div>

//             <div className="p-2 mb-7 border border-gray-100 flex gap-1 items-center">
//                 {product.thumbnail != null &&
//                     product.thumbnail.map((item, key) => (
//                         <Image
//                             src={URL.createObjectURL(item)}
//                             alt="Selected File Preview"
//                             width={44}
//                             height={44}
//                             key={key}
//                         />
//                     ))}
//             </div>
//         </div>
//     </div>;
// }
