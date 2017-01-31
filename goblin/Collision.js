var Collision = function(lb,tb,rb,bb,object){
  if (lb <= object.x + object.rb && rb >= object.x + object.lb &&
      tb <= object.y + object.bb && bb >= object.y + object.tb)
    return true;
  return false;
};
