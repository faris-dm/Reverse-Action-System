i am using map to store user info in my local storge

Map is used to store data in the memory while the app is running

it is usefull for
temporary storage
testing the logic

set(key,value) =add or update a vallue
get()=geta vallue by key
get(key)= check if a key exist

<!--  map is -->

new product ={ id:name,req.body.name }
set= save data
get()=read data

####

express.urlencoded() - Parses URL-encoded bodies.

it acceptes text from and change it to clean js-object

when data is sent from the form it is in the form of x-www-urlincoded like name=solo&password=12345

### so

express can not read this so express.urlencode-change it to parse and make it readable

and then attach it toreq.body.

it it vallue true ,it is a permisstion to use a libery in node true use this qs
false=use querystring
if it is false it only accespts basic vallues {name:"solo"
}

if it is true: we can send multiple line nasted array

const {email,profile}=req.body

used for clean code
but if one varable is not correvt then it is the whole is undefined
means
const email=req.body.email
const profile=req.body.profile

lets say let email=:solo@gmail

let user={name:"faris",age:"rool"}
then if we used const userStore=new map()

userStore.set(email.user)
then i stored emai and an object called suer in then localstorges

#### const signup=(email,userInfo)=> {

}
means it check a user with that email are existed or not
also this are emails and userInfo
are parameters that the user expexts from suer or some one when the function is called

#### Map()

    is a fast and simple way of storeing data in the local memorey
    propertes of Map
    1 new Map()=create new map
    2:Map.set(key,vallue)=add or   update  an item
    3: .get(key)=find some vallue
    .has(key)=check if it existed
    .delete()=delete evetything
    .size()=count elements

### WHY WE USE EMAIL AS A KEY

     we use email as a key blc it is unique and,can be used  to  retive the needed info based on  that



#### app.post("/login"/,pasport.authticate("local"),{})

after the useer click submit in the login form the passport  grap the email and passport and use authticateUser to auth the email and  the passport 
 then redirect based on the outcome

### app.post(
  "/login",
  passport.authenticate("local", {

i wrote  passport.use(new Localstartgy ({userfiled})) so when i use local   it use it








 {isCreateModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 overflow-hidden">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            onClick={resetForm}
          />
          <div className="relative w-full max-w-2xl bg-white border border-slate-100 rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[95vh] animate-in zoom-in-95 duration-300">
            <div className="p-8 lg:p-12 border-b border-slate-50 flex items-center justify-between bg-white shrink-0">
              <div>
                <h2 className="text-2xl font-black italic uppercase text-slate-900 tracking-tighter">
                  Broadcast <span className="text-blue-600">New RFP</span>
                </h2>
                <div className="flex gap-2 mt-3">
                  {[1, 2, 3].map((s) => (
                    <div
                      key={s}
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        formStep >= s ? "w-10 bg-blue-600" : "w-4 bg-slate-100"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <button
                onClick={resetForm}
                className="p-3 bg-slate-50 text-slate-400 hover:text-slate-900 rounded-full"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-8 lg:p-12 custom-scrollbar">
              {formStep === 1 && (
                <div className="space-y-8 animate-in slide-in-from-right-8 duration-300">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                      Title of RFP
                    </label>
                    <div className="relative">
                      <FileText
                        className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300"
                        size={18}
                      />
                      <input
                        value={newRfp.title}
                        onChange={(e) =>
                          setNewRfp({ ...newRfp, title: e.target.value })
                        }
                        placeholder="e.g. 5,000 Industrial Safety Helmets"
                        className="w-full bg-slate-50 border border-slate-100 rounded-[24px] p-6 pl-16 text-sm font-bold outline-none focus:bg-white focus:border-blue-600"
                      />
                    </div>
                  </div>

                  {/* added */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                      Item Descrption
                    </label>
                    <div className="relative">
                      <FileText
                        className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300"
                        size={18}
                      />
                      <input
                        value={newRfp.description}
                        onChange={(e) =>
                          setNewRfp({ ...newRfp, description: e.target.value })
                        }
                        placeholder="Item Description"
                        className="w-full bg-slate-50 border border-slate-100 rounded-[24px] p-6 pl-16 text-sm font-bold outline-none focus:bg-white focus:border-blue-600"
                      />
                    </div>
                  </div>

                  {/*  new form for  */}

                  {/* added */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                        Category
                      </label>
                      <select
                        value={newRfp.category}
                        onChange={(e) =>
                          setNewRfp({ ...newRfp, category: e.target.value })
                        }
                        className="w-full bg-slate-50 border border-slate-100 rounded-[24px] p-6 text-sm font-bold outline-none appearance-none"
                      >
                        <option>Industrial</option>
                        <option>IT Services</option>
                        <option>Logistics</option>
                        <option>Office Supplies</option>
                        <option>Metal Supplier</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                        Priority
                      </label>
                      <div className="flex gap-2">
                        {["Normal", "Urgent"].map((p) => (
                          <button
                            key={p}
                            onClick={() =>
                              setNewRfp({ ...newRfp, priority: p })
                            }
                            className={`flex-1 py-6 rounded-[24px] border transition-all text-[10px] font-black uppercase ${
                              newRfp.priority === p
                                ? "bg-slate-900 text-white border-slate-900"
                                : "bg-slate-50 text-slate-400 border-slate-100"
                            }`}
                          >
                            {p}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {formStep === 2 && (
                <div className="space-y-8 animate-in slide-in-from-right-8 duration-300">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                      Budget (₱)
                    </label>
                    <input
                      type="number"
                      value={newRfp.budget}
                      onChange={(e) =>
                        setNewRfp({ ...newRfp, budget: e.target.value })
                      }
                      className="w-full bg-slate-50 border border-slate-100 rounded-[24px] p-6 text-sm font-bold outline-none"
                    />
                  </div>

                  {/* added Quality */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                      Quantity (Q)
                    </label>
                    <input
                      type="number"
                      value={newRfp.quantity}
                      onChange={(e) =>
                        setNewRfp({ ...newRfp, quantity: e.target.value })
                      }
                      className="w-full bg-slate-50 border border-slate-100 rounded-[24px] p-6 text-sm font-bold outline-none"
                    />
                  </div>

                  {/* added address */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                      Address
                    </label>
                    <div className="relative">
                      <FileText
                        className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300"
                        size={18}
                      />
                      <input
                        value={newRfp.location}
                        onChange={(e) =>
                          setNewRfp({ ...newRfp, location: e.target.value })
                        }
                        placeholder="Buyer Location"
                        className="w-full bg-slate-50 border border-slate-100 rounded-[24px] p-6 pl-16 text-sm font-bold outline-none focus:bg-white focus:border-blue-600"
                      />
                    </div>
                  </div>

                  {/* added adderes */}
                  {/* addede expridet of auction proposal */}
                  <div className="space-y-2">
  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
    Auction Ends
  </label>
  
  <input
    type="datetime-local"
    // This blocks any date before 'now'
    min={new Date().toISOString().slice(0, 16)} 
    value={newRfp.expedet}
    onChange={(e) => setNewRfp({ ...newRfp, expedet: e.target.value })}
    className="w-full bg-slate-50 border border-slate-100 rounded-[24px] p-6 text-sm font-bold outline-none focus:border-blue-600"
  />

  {/* Simple Description */}
  {newRfp.expedet && (
    <p className="mt-2 ml-2 text-[10px] font-bold text-blue-600 uppercase">
      Closing on: {new Date(newRfp.expedet).toDateString()}
    </p>
  )}
</div>

                  {/* aadded proposal  */}

                  {/* added quality */}
                </div>
              )}
              {formStep === 3 && (
                <div className="text-center space-y-8 py-6">
                  <div className="w-20 h-20 bg-blue-600 rounded-[30px] flex items-center justify-center text-white mx-auto shadow-xl">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-2xl font-black uppercase text-slate-900">
                    Final Confirmation
                  </h3>
                </div>
              )}
            </div>
            <div className="p-8 lg:p-12 bg-white border-t border-slate-50 flex items-center gap-4 shrink-0">
              {formStep > 1 && (
                <button
                  onClick={() => setFormStep((s) => s - 1)}
                  className="flex-1 py-6 bg-slate-100 text-slate-600 font-black uppercase rounded-[28px] text-[9px]"
                >
                  Back
                </button>
              )}
              {formStep < 3 ? (
                <button
                  onClick={() => setFormStep((s) => s + 1)}
                  className="flex-[2] py-6 bg-slate-900 text-white font-black uppercase rounded-[28px] text-[9px]"
                >
                  Next Stage
                </button>
              ) : (
                <button
                  onClick={handlePublishRfp}
                  className="flex-[2] py-6 bg-blue-600 text-white font-black uppercase rounded-[28px] text-[9px]"
                >
                  Publish RFQ
                </button>
              )}
            </div>
          </div>
        </div>
      )}