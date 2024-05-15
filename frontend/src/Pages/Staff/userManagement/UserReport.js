import React from 'react';
import useReportData from '../../../hooks/Staff/userManagement/useUserReport';
import useNewAccountsData from '../../../hooks/Staff/userManagement/useNewusersReport';
import { PDFDocument, rgb } from 'pdf-lib';

const ReportPage = () => {
    const reportUrl = '/api/generateReport';
    const newAccountsUrl = '/api/getNewAccountsWithinOneMonth';

    // Use the hooks to fetch report data
    const { reportData, loading: reportLoading, error: reportError } = useReportData(reportUrl);
    const { newAccountsData, loading: accountsLoading, error: accountsError } = useNewAccountsData(newAccountsUrl);

    const handleGenerateReport = () => {
        // Check if reportData is available
        if (reportData) {
            // Generate PDF report using reportData
            generateReportPDF(reportData, 'User Summery Report','Sunset Araliya horizontal.png');
        } else {
            console.error('No report data available.');
        }
    };

    const handleGenerateNewAccountsReport = () => {
        // Check if newAccountsData is available
        if (newAccountsData) {
            // Generate PDF report using newAccountsData
            generatePDF(newAccountsData, 'New Accounts Within Last Month','Sunset Araliya horizontal.png');
        } else {
            console.error('No new accounts data available.');
        }
    };

    //for new users pdf
    const generatePDF = async (data, reportName, headerImageURL) => {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage();
        const { width, height } = page.getSize();
        const fontSize = 15;
    
        // Draw header background color
        const headerBackgroundColor = rgb(0.30, 0.60, 0.85); 
        page.drawRectangle({
            x: 0,
            y: height - 40, 
            width: width,
            height: 40, 
            color: headerBackgroundColor,
        });
    
        // Draw header image
        if (headerImageURL) {
            const imageBytes = await fetch(headerImageURL).then((res) => res.arrayBuffer());
            const image = await pdfDoc.embedPng(imageBytes);
            page.drawImage(image, {
                x: 250, 
                y: height - 35, 
                width: 80,
                height: 35, 
                
            });
        }
    
        // Draw report name
        page.drawText(`${reportName}`, {
            x: 190, 
            y: height - 70,
            size: fontSize,
            color: rgb(0, 0, 0), 
        });
    
        let textY = height - 100;
    
        if (Array.isArray(data.users)) {
            textY -= 20;
            page.drawText(`New Accounts Count: ${data.count}`, {
                x: 50,
                y: textY,
                size: fontSize,
                color: rgb(0, 0, 0),
            });
    
            data.users.forEach((user, index) => {
                textY -= 20;
                page.drawText(`User ${index + 1}: Email - ${user.email}, Verified - ${user.verified ? 'Yes' : 'No'}`, {
                    x: 50,
                    y: textY,
                    size: fontSize,
                    color: rgb(0, 0, 0),
                });
            });
        } else {
            // Handle non-array data
            textY -= 20;
            page.drawText(`Data: ${JSON.stringify(data)}`, {
                x: 50,
                y: textY,
                size: fontSize,
                color: rgb(0, 0, 0),
            });
        }
    
        const pdfBytes = await pdfDoc.save();
    
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
    
        // Open PDF in a new tab
        window.open(url, '_blank');
    };
    

    // for user summary pdf
    const generateReportPDF = async (data, reportName, headerImage) => {
        // Create a new PDF document
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage();
    
        // Set document title
        pdfDoc.setTitle(reportName);
    
        // Set header
        const { width, height } = page.getSize();
        const fontSize = 15;
        const headerText = `Report: ${reportName}`;
    
        // Draw background rectangle for header with background color
        const headerBackgroundColor = rgb(0.30, 0.60, 0.85); 
        page.drawRectangle({
            x: 0,
            y: height - 40,
            width: width,
            height: 40,
            color: headerBackgroundColor,
            borderColor: headerBackgroundColor, 
            borderWidth: 0, 
            fillOpacity: 1, 
        });
    
        // Draw header text
        page.drawText(headerText, {
            x: 50,
            y: height - 25,
            size: fontSize,
            color: rgb(0, 0, 0), 
        });
    
        // Add header image
        if (headerImage) {
            const imageBytes = await fetch(headerImage).then((res) => res.arrayBuffer());
            let image;
            if (headerImage.endsWith('.png')) {
                image = await pdfDoc.embedPng(imageBytes);
            } else if (headerImage.endsWith('.jpg') || headerImage.endsWith('.jpeg')) {
                image = await pdfDoc.embedJpg(imageBytes);
            } else {
                console.error('Unsupported image format. Only PNG and JPG images are supported.');
                return;
            }
            page.drawImage(image, {
                x: width - 100, 
                y: height - 35, 
                width: 80,
                height: 35, 
            });
        }
    
        // Set content
        let textY = height - 100;
        if (data) {
            Object.entries(data).forEach(([key, value], index) => {
                textY -= 20;
                if (key === 'roleDistribution') {
                    page.drawText(`Role Distribution:`, {
                        x: 50,
                        y: textY,
                        size: fontSize,
                        color: rgb(0, 0, 0),
                    });
                    value.forEach(({ _id, count }) => {
                        textY -= 20;
                        page.drawText(`- Role: ${_id}, Count: ${count}`, {
                            x: 70,
                            y: textY,
                            size: fontSize,
                            color: rgb(0, 0, 0),
                        });
                    });
                } else {
                    page.drawText(`${key}: ${JSON.stringify(value)}`, {
                        x: 50,
                        y: textY,
                        size: fontSize,
                        color: rgb(0, 0, 0),
                    });
                }
            });
        } else {
            textY -= 20;
            page.drawText(`Data not available`, {
                x: 50,
                y: textY,
                size: fontSize,
                color: rgb(0, 0, 0),
            });
        }
    
        // Save PDF document
        const pdfBytes = await pdfDoc.save();
    
        // Create URL for PDF blob
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
    
        // Open PDF in a new tab
        window.open(url, '_blank');
    };





    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-primary bg-opacity-25">
            <h2>Reports</h2>
            <div className="w-50 mt-2">
                <button
                    onClick={handleGenerateReport}
                    disabled={reportLoading}
                    className="btn btn-primary btn-lg mb-2 w-50"
                >
                    {reportLoading ? 'Generating...' : 'Generate Users Summery'}
                </button>
            </div>
            <div className="w-50">
                <button
                    onClick={handleGenerateNewAccountsReport}
                    disabled={accountsLoading}
                    className="btn btn-success btn-lg w-50"
                >
                    {accountsLoading ? 'Generating...' : 'Generate New Accounts Report'}
                </button>
            </div>
            {reportError && <div>Error fetching report data: {reportError}</div>}
            {accountsError && <div>Error fetching new accounts data: {accountsError}</div>}
        </div>


    );
};

export default ReportPage;