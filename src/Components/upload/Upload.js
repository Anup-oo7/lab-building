import React,{useState,useEffect} from 'react'
import './upload.css'
import { Link } from 'react-router-dom';
import * as XLSX from 'xlsx';

import companylogo from './images/companylogo.png'
import category from './images/Category.png'
import chart from './images/Chart.png'
import ticket from './images/Ticket.png'
import document from './images/Document.png'
import calendar from './images/Calendar.png'
import notification from './images/Notification.png'
import settings from './images/Setting.png'
import bellIcon from './images/bellIcon.png'
import userPic from './images/userPic.png'
import excel from './images/excel.png'
import uploadicon from './images/uploadicon.png'

import loading from './images/loading.png'

function Upload() {

  const [selectedFile, setSelectedFile] = useState(null);
  const [buttonContent, setButtonContent] = useState({ icon: uploadicon, text: 'Upload' });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [showSelectedFileName, setShowSelectedFileName] = useState(false);
  const [uploadedData, setUploadedData] = useState(null);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSelectedFileName(true);
      setButtonContent({ icon: uploadicon, text: 'Upload' });
    }, 2000);
  
    // Clear timeout and reset buttonDisabled after the timer
    const cleanup = () => {
      clearTimeout(timer);
      setButtonDisabled(false);
    };
  
    // Cleanup when component unmounts or when selectedFile changes
    return cleanup;
  }, [selectedFile]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const validFileTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'csv'];

      if (validFileTypes.includes(file.type)) {
        setSelectedFile(file);
        setButtonContent({ icon: loading });
        setButtonDisabled(true);

        const reader = new FileReader();
        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
          setUploadedData(jsonData);
        };
        reader.readAsArrayBuffer(file);
      } else {
        setSelectedFile(null);
        setButtonContent({ icon: uploadicon, text: 'Upload' });
        // setButtonDisabled(false);
        alert('Please select a valid Excel (.xlsx) or CSV (.csv) file.');
      }
    } else {
      setSelectedFile(null);
      setButtonContent({ icon: uploadicon, text: 'Upload' });
      // setButtonDisabled(false);
      alert('Please select a file.');
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setButtonContent({ icon: uploadicon, text: 'Upload' });
    setButtonDisabled(false);
    
    setUploadedData(null);
  };
  
  // const handleButtonClick = (event) => {
  //   const syntheticEvent = {
  //     target: {
  //       files: document.getElementById('fileInput').files,
  //     },
  //   };

  //   // Call handleFileChange with the synthetic event
  //   handleFileChange(syntheticEvent);
  // };
  // const uploadFile = () => {
  //   if (selectedFile) {
  //     // Simulate file upload initiation
  //     setButtonContent({ icon: loading, text: 'Uploading...' });
  //     setButtonDisabled(true);
  //   } else {
  //     alert('Please select a valid Excel file before uploading.');
  //   }
  // };

  const renderTableHeader = () => {
    return (
      <tr>
        <th>Sl. No.</th>
        <th>Links</th>
        <th>Prefix</th>
        <th>Select Tags</th>
        <th>Selected Tags</th>
      </tr>
    );
  };

 // ... (your existing code)

// ... (your existing code)

const renderTableData = () => {
  if (!uploadedData) return null;

  return uploadedData.map((row, index) => {
    const [id, links, prefix, selectTags, selectedTags] = row;

    return (
      <tr key={id}>
        <td>{index + 1}</td>
        <td>
          <a href={`http://${links}`} target="_blank" rel="noopener noreferrer">
            {links}
          </a>
        </td>
        <td>{prefix}</td>
        <td>
          {/* Render a dropdown for select tags */}
          <select value={selectTags} onChange={(e) => handleSelectTagsChange(index, e.target.value)}>
            {selectTags.split(', ').map((tag) => (
              <option key={tag}>{tag}</option>
            ))}
          </select>
        </td>
        <td>
          {/* Display selected tags and a remove button for each tag */}
          {Array.isArray(selectedTags) &&
            selectedTags.map((tag, tagIndex) => (
              <div key={tagIndex} className="selected-tag">
                <span>{tag}</span>
                <button className='removeTag' onClick={() => handleRemoveTag(index, tag)}>X</button>
              </div>
            ))}
        </td>
      </tr>
    );
  });
};

const handleSelectTagsChange = (index, value) => {
  const updatedData = [...uploadedData];
  const selectedTagsArray = value.split(',').map((tag) => tag.trim());
  updatedData[index][3] = value; // Update the "Select Tags" column
  updatedData[index][4] = selectedTagsArray; // Update the "Selected Tags" column
  setUploadedData(updatedData);
};

const handleRemoveTag = (rowIndex, tagToRemove) => {
  const updatedData = [...uploadedData];
  updatedData[rowIndex][4] = (updatedData[rowIndex][4] || []).filter((tag) => tag !== tagToRemove);
  setUploadedData(updatedData);
};

// ... (your existing code)


// ... (your existing code)

const [sidebarVisible, setSidebarVisible] = useState(false);
const toggleSidebar = () => {
  setSidebarVisible(!sidebarVisible);
};

  return (
    <div className={`container ${sidebarVisible ? 'sidebar-visible' : ''}`}>
      <div className='toggle-icon' onClick={toggleSidebar}>
        <span>{sidebarVisible ? '✖' : '☰'}</span>
      </div>

      <div className='companylogo '>
          <img src={companylogo} alt="" /><span>Base</span>
        </div>
     <div className={`sidebar ${sidebarVisible ? 'visible' : ''}`}>
       
        
       
        <ul className='sidebarList'>
            <Link><img src={category} alt="" />Dashboard</Link>
            <Link><img src={chart} alt="" />Upload</Link>
            <Link><img src={ticket} alt="" />Invoice</Link>
            <Link><img src={document} alt="" />Schedule</Link>
            <Link><img src={calendar} alt="" />Calendar</Link>
            <Link><img src={notification} alt="" />Notifications</Link>
            <Link><img src={settings} alt="" />Settings</Link>
        </ul>
     </div>

     <div className='uploadArea'>
        <header className='header'>
        <h2>Upload CSV</h2> 
        <div className='right'>
            <img src={bellIcon} alt="" />
            <img src={userPic} alt="" />
        </div>
        </header>

        <div className='InputArea'>
          <div className='fileUpload'>
            <label htmlFor='fileInput'>
              <img src={excel} alt='' />
              <p style={{ color: '#999CA0' }}>
                {selectedFile ? selectedFile.name : 'Drop your Excel sheet here or '}
                {selectedFile ? <p className='remove-red' onClick={handleRemoveFile}>Remove</p> : <span style={{ color: '#605BFF' }}>browse</span>}
              </p>
            </label>
            <input
              id='fileInput'
              type='file'
              accept='.xlsx'
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </div>
          <button
            className='uploadBtn'
            disabled={buttonDisabled}
            style={{ backgroundColor: !!selectedFile ? '#CCCCCC' : '' }}
           
          >
            <img src={buttonContent.icon} alt='' />
            <span>{buttonContent.text}</span>
          </button>
        </div>

        <div className='uploadedFileItems'>
        {uploadedData && (
          <table>
            <thead>{renderTableHeader()}</thead>
            <tbody>{renderTableData()}</tbody>
          </table>
        )}
      </div>
      </div>

      
     </div>
   
  )
}

export default Upload