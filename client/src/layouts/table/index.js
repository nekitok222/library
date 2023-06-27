import MDBox from "components/MDBox"
import DashboardLayout from "examples/LayoutContainers/DashboardLayout"
import DashboardNavbar from "examples/Navbars/DashboardNavbar"
import Footer from "examples/Footer"

import { useCallback, useEffect, useState } from "react"

import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import "ag-grid-enterprise"
import { AgGridReact } from "ag-grid-react"
import { fetchAllAuthors } from "api/AuthorAPI"
import { fetchAllBooks } from "api/bookAPI"
import { AuthorCreate } from "components/modals/createAuthor"
import { AuthorChange } from "components/modals/changeAuthor"
import { AuthorDelete } from "components/modals/deleteAuthor"
import { BookCreate } from "components/modals/createBook"
import { BookChange } from "components/modals/changeBook"
import { BookDelete } from "components/modals/deleteBook"

const Table = () => {
  const [rowDataAuthor, setRowDataAuthor] = useState([])

  const [columnDefsAuthor] = useState([
    { headerName: "ФИО", field: "name", sortable: true, filter: true },
    { headerName: "Рейтинг", field: "rating", sortable: true, filter: true },
    {
      headerName: "Дата рождения",
      field: "birthday",
      sortable: true,
      filter: true,
    },
  ])

  const [columnDefsBook] = useState([
    {
      headerName: "Название книги",
      field: "name",
      sortable: true,
      filter: true,
      cellRenderer: (props) => {
        if (props.value !== undefined) {
          return props.value
        } else {
          return (
            <img src="https://www.ag-grid.com/example-assets/loading.gif" />
          )
        }
      },
    },
    { headerName: "Цена", field: "price", sortable: true, filter: true },
    { headerName: "Рейтинг", field: "rating", sortable: true, filter: true },
    {
      headerName: "Дата написания",
      field: "date_writing",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Имя автора",
      field: "author",
      sortable: true,
      filter: true,
    },
  ])

  const setDataForAuthor = (data) => {
    let result = []
    data.map((author) => {
      result.push({
        name: author.name,
        rating: author.rating,
        birthday: author.birthday,
      })
      setRowDataAuthor(result)
    })
  }

  const onGridReady = useCallback((params) => {
    fetchAllBooks(0, 1000)
      .then((data) => {
        const dataSource = {
          rowCount: undefined,
          getRows: (params) => {
            setTimeout(function () {
              const rowsThisPage = data.slice(params.startRow, params.endRow)
              let lastRow = -1
              if (data.length <= params.endRow) {
                lastRow = data.length
              }
              params.successCallback(rowsThisPage, lastRow)
            }, 500)
          },
        }
        params.api.setDatasource(dataSource)
      })
  }, [])

  useEffect(() => {
    fetchAllAuthors().then((data) => setDataForAuthor(data))
  }, [])

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <div>
            <MDBox py={1.5}>
              <div
                className="ag-theme-alpine"
                style={{ height: 400, width: 600 }}
              >
                <AgGridReact
                  rowData={rowDataAuthor}
                  columnDefs={columnDefsAuthor}
                  rowSelection="multiple"
                ></AgGridReact>
              </div>
            </MDBox>
          </div>
          <div style={{ display: "flex", flexDirection: "column", width: 800 }}>
            <AuthorCreate/>
            <AuthorChange/>
            <AuthorDelete/>
          </div>
        </div>
        <MDBox py={1.5}>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <div className="ag-theme-alpine" style={{ height: 400, width: 1000 }}>
              <div style={{ display: "flex", marginBottom: 20}}>
                <BookCreate/>
                <BookChange/>
                <BookDelete/>
              </div>
              <AgGridReact
                columnDefs={columnDefsBook}
                rowSelection="multiple"
                rowModelType={'infinite'}
                onGridReady={onGridReady}
              ></AgGridReact>
            </div>
          </div>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  )
}

export default Table
