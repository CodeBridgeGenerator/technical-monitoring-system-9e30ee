import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Tag } from 'primereact/tag';
import moment from "moment";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';


const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const BreakDownTicketsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [checkListFormId, setCheckListFormId] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

     useEffect(() => {
                    //on mount checkListForms
                    client
                        .service("checkListForms")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleCheckListFormsId } })
                        .then((res) => {
                            setCheckListFormId(res.data.map((e) => { return { name: e['description'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "CheckListForms", type: "error", message: error.message || "Failed get checkListForms" });
                        });
                }, []);

    const onSave = async () => {
        let _data = {
            machineId: _entity?.machineId,
checkListFormId: _entity?.checkListFormId?._id,
status: _entity?.status,
        };

        setLoading(true);
        try {
            
        await client.service("breakDownTickets").patch(_entity._id, _data);
        const eagerResult = await client
            .service("breakDownTickets")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "checkListFormId",
                    service : "checkListForms",
                    select:["description"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info breakDownTickets updated successfully" });
        props.onEditResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to update info");
            props.alert({ type: "error", title: "Edit info", message: "Failed to update info" });
        }
        setLoading(false);
    };

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError({});
    };

    const checkListFormIdOptions = checkListFormId.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit Break Down Tickets" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="breakDownTickets-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="machineId">MachineId:</label>
                <InputText id="machineId" className="w-full mb-3 p-inputtext-sm" value={_entity?.machineId} onChange={(e) => setValByKey("machineId", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["machineId"]) && (
              <p className="m-0" key="error-machineId">
                {error["machineId"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="checkListFormId">CheckListFormId:</label>
                <Dropdown id="checkListFormId" value={_entity?.checkListFormId?._id} optionLabel="name" optionValue="value" options={checkListFormIdOptions} onChange={(e) => setValByKey("checkListFormId", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["checkListFormId"]) && (
              <p className="m-0" key="error-checkListFormId">
                {error["checkListFormId"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="status">Status:</label>
                <InputText id="status" className="w-full mb-3 p-inputtext-sm" value={_entity?.status} onChange={(e) => setValByKey("status", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["status"]) && (
              <p className="m-0" key="error-status">
                {error["status"]}
              </p>
            )}
          </small>
            </div>
                <div className="col-12">&nbsp;</div>
                <small className="p-error">
                {Array.isArray(Object.keys(error))
                ? Object.keys(error).map((e, i) => (
                    <p className="m-0" key={i}>
                        {e}: {error[e]}
                    </p>
                    ))
                : error}
            </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(BreakDownTicketsCreateDialogComponent);
