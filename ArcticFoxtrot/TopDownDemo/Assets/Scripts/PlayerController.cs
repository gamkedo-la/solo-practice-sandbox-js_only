using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.InputSystem;

public class PlayerController : MonoBehaviour
{

    private Vector2 movementDirection;
    private Vector2 moveVector;
    private Rigidbody2D rb;

    [SerializeField] float playerSpeed = 1.0f;


    private void OnUse(InputValue value){
        Debug.Log("Use detected!");
    }

    private void OnMovement(InputValue value){
        movementDirection = value.Get<Vector2>();
    }

    private void Start() {
        rb = GetComponent<Rigidbody2D>();
        if(!rb || rb == null){
            Debug.LogWarning("Player has no rigidbody2d component attached!");
        }
    }


    private void Update() {
        
    }

    private void FixedUpdate() {
        CalculateMovement();
        MovePlayer();
    }


    private void CalculateMovement(){
        float vertical = movementDirection.x;
        float horizontal = movementDirection.y;

        moveVector = new Vector2(vertical * playerSpeed * Time.deltaTime, horizontal * playerSpeed * Time.deltaTime);
    }
    
        private void MovePlayer()
    {
        rb.velocity = moveVector;
    }


}
