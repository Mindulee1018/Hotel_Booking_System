import React, { useEffect, useRef, useState } from 'react'
import Header from '../../component/Header';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import axios from 'axios';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Inventory_report = () => {
  const [state, setState] = useState({
    inventory: []
  })
  useEffect(() => {
    axios.get("http://localhost:4000/roominventory/").then(res =>{
        if(res.data){
          setState({
            roominventory:res.data
          })
        }
    })
}, [state]);

//Report download function
const pdfRef = useRef();
const downloadPDF = () => {
  const input = pdfRef.current;
  html2canvas(input).then((Canvas) => {
    const imgData = Canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4', true);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = Canvas.width;
    const imgHeight = Canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgY = 30;
    pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
    pdf.save('RoomInventoryReport.pdf');
  });
};

  return (
    <>
    <div class="col">
        <Header dashboard={"Inventory Management System"} />
    </div>
    <div class="container-fluid">
      <div class="row flex-nowrap">
        <div class="col py-3">
          <div ref={pdfRef}>
        <h2 class="my-5 text-center">Inventory Stock count report</h2>
        
        {state.inventory && state.inventory.length > 0 && (
          <div>
            <BarChart
          width={500}
          height={300}
          data={state.inventory}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="itemName" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="stockCount" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
          <Bar dataKey="reorderPoint" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
        </BarChart>
      </div>
        )}
        </div>
          <div className='mt-5'>
            <button className='btn btn-primary me-2' type='submit'>
            <a href="./Manager_view"  style={{textDecoration: 'none', color:'white'}}>Back</a>
            </button>
            <button className='btn btn-primary' onClick={downloadPDF}>Download PDF</button>
          </div>
        </div>
        </div>
      </div>
    </>
  )
}

export default Inventory_report