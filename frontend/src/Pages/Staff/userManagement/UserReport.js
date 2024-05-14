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
            generateReportPDF(reportData, 'User Summery Report');
        } else {
            console.error('No report data available.');
        }
    };

    const handleGenerateNewAccountsReport = () => {
        // Check if newAccountsData is available
        if (newAccountsData) {
            // Generate PDF report using newAccountsData
            generatePDF(newAccountsData, 'New Accounts Within Last Month');
        } else {
            console.error('No new accounts data available.');
        }
    };

    //for new users pdf
    const generatePDF = async (data, reportName) => {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage();
        const { width, height } = page.getSize();
        const fontSize = 15;

        page.drawText(`${reportName}`, {
            x: 50,
            y: height - 50,
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
    const generateReportPDF = async (data, reportName) => {
        // Create a new PDF document
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage();

        // Set document title
        pdfDoc.setTitle(reportName);

        // Set header
        const { width, height } = page.getSize();
        const fontSize = 15;
        const headerText = `Report: ${reportName}`;

        page.drawText(headerText, {
            x: 50,
            y: height - 50,
            size: fontSize,
            color: rgb(0, 0, 0),
        });

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
