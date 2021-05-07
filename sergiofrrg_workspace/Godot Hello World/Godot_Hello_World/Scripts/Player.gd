extends Sprite


# Declare member variables here. Examples:
# var a = 2
# var b = "text"

var myVec := Vector2(10, 10)

# Called when the node enters the scene tree for the first time.
func _ready():
	print("Ready")
	#position = myVec


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta):
	pass
	#position.x += 50 * delta
	#position += myVec * delta
	
func _physics_process(delta):
	#print(delta)
	pass


func _on_Timer_timeout():
	visible = false
