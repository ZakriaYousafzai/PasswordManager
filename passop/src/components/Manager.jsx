import React, { useEffect } from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const getPasswords = async (params) => {
    let req = await fetch("http://localhost:3000/");
    let passwords = await req.json();
    console.log(passwords)
    setPasswordArray(passwords);
  };

  useEffect(() => {
    getPasswords();
  }, []);

  const copyText = (text) => {
    toast("Copied to Clipboard", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

    navigator.clipboard.writeText(text);
  };

  const savePassword = async () => {
    setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);

    await fetch("http://localhost:3000/", {method: 'DELETE', headers:{"Content-Type": "application/json" }, body: JSON.stringify({ id: form.id })})

    await fetch("http://localhost:3000/", {method: 'POST', headers:{"Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() })})

    setform({ site: "", username: "", password: "" });
  };

  const editPassword = (id) => {
    setform({...passwordArray.filter((i) => i.id === id)[0], id: id});
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const deletePassword = async (id) => {
    setPasswordArray(passwordArray.filter((item) => item.id !== id));

    let res = await fetch("http://localhost:3000/", {method: 'DELETE', headers:{"Content-Type": "application/json" }, body: JSON.stringify({ id })})

  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition="Bounce"
      />
      <ToastContainer />

      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
      </div>

      <div className="p-2 md:p-0 md:mycontainer min-h-[74.7vh]">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-700">&lt;</span>
          <span>Pass</span>
          <span className="text-green-700">OP/&gt;</span>
        </h1>

        <p className="text-green-900 text-lg text-center">
          Your own Password Manager
        </p>

        <div className="flex flex-col p-4 text-black gap-8 items-center">
          <input
            className="rounded-full border border-green-500 w-full p-4 py-1"
            type="text"
            name="site"
            id=""
            placeholder="Enter Website URL"
            value={form.site}
            onChange={handleChange}
          />

          <div className="flex flex-col md:flex-row w-full gap-8 justify-between">
            <input
              className="rounded-full border border-green-500 w-full p-4 py-1"
              type="text"
              name="username"
              id=""
              placeholder="Enter UserName"
              value={form.username}
              onChange={handleChange}
            />
            <input
              className="rounded-full border border-green-500 w-full p-4 py-1"
              type="text"
              name="password"
              id=""
              placeholder="Enter Password"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <button
            onClick={savePassword}
            className="flex justify-center items-center bg-green-600 hover:bg-green-500 rounded-full px-8 py-2 w-fit gap-2 border border-green-900"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Add Password
          </button>
        </div>

        <div className="passwords">
          <h2 className="font-bold text-2xl py-4">Your Passwords</h2>

          {passwordArray.length === 0 && <div>No Password to show</div>}

          {passwordArray.length != 0 && (
            <table className="table-auto w-full overflow-hidden rounded-md ">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2 border border-white text-center">
                        <div className="flex items-center justify-center">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <div
                            onClick={() => {
                              copyText(item.site);
                            }}
                            className="size-7 cursor-pointer"
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "4px",
                                paddingLeft: "4px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>

                      <td className="py-2 border border-white text-center">
                        <div className="flex items-center justify-center">
                          <span>{item.username}</span>
                          <div
                            onClick={() => {
                              copyText(item.username);
                            }}
                            className="size-7 cursor-pointer"
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "4px",
                                paddingLeft: "4px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>

                      <td className="py-2 border border-white text-center">
                        <div className="flex items-center justify-center">
                          <span>{item.password}</span>
                          <div
                            onClick={() => {
                              copyText(item.password);
                            }}
                            className="size-7 cursor-pointer"
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "4px",
                                paddingLeft: "4px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>

                      <td className="py-2 border border-white text-center">
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => {
                            editPassword(item.id);
                          }}
                        >
                          <lord-icon
                            style={{
                              width: "25px",
                              height: "25px",
                            }}
                            src="https://cdn.lordicon.com/gwlusjdu.json"
                            trigger="hover"
                          ></lord-icon>
                        </span>
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => {
                            deletePassword(item.id);
                          }}
                        >
                          <lord-icon
                            style={{
                              width: "25px",
                              height: "25px",
                            }}
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
