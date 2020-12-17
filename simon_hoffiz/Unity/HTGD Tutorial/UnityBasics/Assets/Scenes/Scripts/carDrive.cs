using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class carDrive : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        Debug.Log("car object named" + gameObject.name + "started script");
    }

    // Update is called once per frame
    void Update()
    {
        /*if(Input.GetKey(KeyCode.UpArrow)) {
            transform.position += transform.forward * Time.deltaTime * 3.0f;
        }
        if(Input.GetKey(KeyCode.DownArrow)) {
            transform.position += transform.forward * Time.deltaTime * -3.0f;
        }*/
            transform.position += transform.forward * Time.deltaTime * 3.0f *
            Input.GetAxis("Vertical");

        /*if(Input.GetKey(KeyCode.RightArrow)) {
            transform.Rotate(Vector3.up, 30.0f * Time.deltaTime);
        }
        if(Input.GetKey(KeyCode.LeftArrow)) {
            transform.Rotate(Vector3.up, -30.0f * Time.deltaTime);
        } */
        transform.Rotate(Vector3.up, 30.0f * Time.deltaTime *
            Input.GetAxis("Horizontal"));
        
    }
}
