import React, { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import InventorySideBar from '../../../components/InventoryManagerSideBar';

const Inventory_report = () => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch("http://localhost:4000/roominventory/");
        if (!response.ok) {
          throw new Error('Failed to fetch inventory: ${response.status}');
        }

        const data = await response.json();
        setInventory(data);
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    };

    fetchInventory();
  }, []); 
  // Report download function
  const pdfRef = useRef();
  const downloadPDF = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30; // Adjust starting point
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save('RoomInventoryReport.pdf');
    });
  };

  return (
    <>
      <div className="col">
        <h1 dashboard="Inventory Management System" />
      </div>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="col py-3">
            <div ref={pdfRef}>
              <h2 className="my-5 text-center">Inventory Stock Count Report</h2>

              {inventory.length > 0 && (
                <div>
                  <BarChart
                    width={500}
                    height={300}
                    data={inventory}
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

            <div className="mt-5">
              <button className="btn btn-primary me-2" type="button">
                <a href="./Manager_view" style={{ textDecoration: 'none', color: 'white' }}>Back</a>
              </button>
              <button className="btn btn-primary" onClick={downloadPDF}>Download PDF</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Inventory_report;